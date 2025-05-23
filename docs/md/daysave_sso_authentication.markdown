# Daysave SSO Authentication

Daysave plans to implement Single Sign-On (SSO) authentication to allow users to log in using enterprise identity providers. This document outlines the planned implementation.

## Overview

SSO will enable users to authenticate with Daysave using their existing enterprise credentials (e.g., from Okta, Azure AD), simplifying access for organizations by reducing the need for separate login credentials.

## Database Schema

### `auth_providers`
Stores authentication provider data for each user.

| Field            | Type     | Constraints               | Description         |
|------------------|----------|---------------------------|---------------------|
| `id`             | UUID     | Primary Key, Default: UUIDV4 | Unique provider ID |
| `user_profile_id`| UUID     | Not Null, Foreign Key (`user_profiles.userId`) | Associated user |
| `provider`       | Enum     | Not Null, Values: `local`, `google`, etc. | Auth provider |
| `provider_user_id`| String  | Nullable                  | Provider-specific user ID |
| `hashed_password`| String  | Nullable                  | Hashed password    |
| `passkey_data`   | JSON     | Nullable                  | Passkey data       |

## Implementation Steps

1. **Choose a Protocol**:
   - **SAML vs. OpenID Connect**:
     - SAML: Older standard, widely used in enterprises, better for legacy systems.
     - OpenID Connect: Modern standard, built on OAuth 2.0, better for web and mobile apps.
   - Decision: Use OpenID Connect for its modern features and compatibility with OAuth providers.

2. **Set Up Provider**:
   - Configure Daysave with an identity provider (e.g., Okta, Azure AD).
   - Store provider credentials in environment variables (e.g., `OKTA_CLIENT_ID`, `OKTA_CLIENT_SECRET`).

3. **Set Up Routes**:
   - Add routes for SSO login and callback in `authRoutes.js`:
     ```javascript
     router.get('/auth/sso', (req, res) => {
       // Redirect to identity provider
     });
     router.get('/auth/sso/callback', (req, res) => {
       // Handle callback
     });
     ```

4. **Handle Authentication**:
   - On successful authentication, store the provider user ID in `auth_providers` with the associated `user_profile_id`.

5. **Session Management**:
   - Use `express-session` or JWT to manage the session.
   - Example with JWT:
     ```javascript
     const token = jwt.sign({ userId: user.userId }, 'your-secret');
     res.cookie('token', token, { httpOnly: true });
     ```

## Flow Diagram

The SSO authentication process can be visualized as follows (using Mermaid in a compatible Markdown renderer):
```
sequenceDiagram
    User->>Express: GET /auth/sso
    Express->>Identity Provider: Redirect for authentication
    Identity Provider-->>User: Prompt for credentials
    User->>Identity Provider: Enter credentials
    Identity Provider-->>Express: Callback with token
    Express->>Sequelize: Store provider_user_id
    Sequelize->>MySQL: INSERT/UPDATE auth_providers
    Express-->>User: Redirect to /content
```

## Challenges

- **Configuration Complexity**:
  - Challenge: Configuring SSO with identity providers can be complex (e.g., setting up SAML assertions).
  - Mitigation: Use libraries like `passport-saml` or `passport-openidconnect` to simplify integration.
- **Provider Compatibility**:
  - Challenge: Not all providers support the same protocols or features.
  - Mitigation: Start with OpenID Connect for broader compatibility and add SAML support as needed.

## Future Enhancements

- **Multiple Providers**:
  - Add support for multiple identity providers (e.g., Okta, Azure AD, Ping Identity).
- **Role Mapping**:
  - Implement role mapping to assign Daysave roles based on provider roles (e.g., mapping an Azure AD "Admin" role to Daysave’s `admin` role).
- **SSO Logout**:
  - Add SSO logout functionality to terminate sessions with the identity provider.