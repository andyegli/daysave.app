# Daysave OAuth Authentication

Daysave plans to implement OAuth 2.0 authentication to allow users to log in using third-party providers (e.g., Google, GitHub). This document outlines the planned implementation.

## Overview

OAuth 2.0 will allow users to authenticate with Daysave using their existing accounts on supported providers, reducing the need to create new credentials.

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

1. **Choose a Library**:
   - Use `passport.js` with OAuth strategies (e.g., `passport-google-oauth20`).
   - Install: `npm install passport passport-google-oauth20`.

2. **Configure Providers**:
   - Register Daysave with each provider to obtain client IDs and secrets.
   - Store these in environment variables:
     ```
     GOOGLE_CLIENT_ID=your-client-id
     GOOGLE_CLIENT_SECRET=your-client-secret
     ```

3. **Set Up Routes**:
   - Add routes for OAuth login in `authRoutes.js`:
     ```javascript
     router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
     router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
       res.redirect('/content');
     });
     ```

4. **Handle Callback**:
   - On successful authentication, check if the user exists in `user_profiles` using the provider user ID.
   - If the user doesn’t exist, create a new `user_profiles` entry and link it in `auth_providers`.
   - If the user exists, update the `auth_providers` entry with the latest provider user ID.

5. **Session Management**:
   - Use `express-session` or JWT to manage user sessions after OAuth login.
   - Example with `express-session`:
     ```javascript
     app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));
     ```

## Flow Diagram

The OAuth process can be visualized as follows (using Mermaid in a compatible Markdown renderer):
```
sequenceDiagram
    User->>Express: GET /auth/google
    Express->>Google: Redirect to Google OAuth
    Google-->>User: Prompt for consent
    User->>Google: Grant consent
    Google-->>Express: Callback with code
    Express->>Google: Exchange code for token
    Google-->>Express: Access token
    Express->>Sequelize: Store provider_user_id
    Sequelize->>MySQL: INSERT/UPDATE auth_providers
    Express-->>User: Redirect to /content
```

## Error Handling

- **Provider Downtime**: If the OAuth provider is down, display an error message to the user (e.g., "Google authentication is currently unavailable").
- **Invalid Credentials**: Handle cases where the user denies consent by redirecting to the login page with an error message.
- **Token Expiration**: Implement token refresh logic to handle expired access tokens.

## Future Enhancements

- **Additional Providers**:
  - Add support for more providers (e.g., Microsoft, Facebook).
- **Refresh Tokens**:
  - Implement refresh tokens to maintain long-lived sessions.
- **Profile Enrichment**:
  - Fetch additional user data from providers (e.g., name, email, profile picture) to enrich user profiles.