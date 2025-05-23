# Daysave Username/Password with 2FA Authentication Notes

This document outlines the key aspects of implementing username/password authentication with two-factor authentication (2FA) in the Daysave app, ensuring a secure and user-friendly login experience.

## Overview

Username/password with 2FA authentication will allow users to log in using their credentials, followed by a second verification step (e.g., TOTP via Google Authenticator or SMS). This method enhances security by requiring two forms of verification, protecting user accounts from unauthorized access.

## Database Schema

### `user_profiles`
Stores core user information.

| Field       | Type     | Constraints               | Description         |
|-------------|----------|---------------------------|---------------------|
| `userId`    | UUID     | Primary Key, Default: UUIDV4 | Unique user ID     |
| `username`  | String   | Not Null, Unique          | User's username    |
| `email`     | String   | Not Null, Unique          | User's email       |
| `createdAt` | DateTime | Not Null, Default: Now    | Creation timestamp |
| `updatedAt` | DateTime | Not Null, Default: Now    | Update timestamp   |

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

### `mfa_methods`
Stores 2FA methods for users.

| Field            | Type     | Constraints               | Description         |
|------------------|----------|---------------------------|---------------------|
| `id`             | UUID     | Primary Key, Default: UUIDV4 | Unique MFA method ID |
| `user_profile_id`| UUID     | Not Null, Foreign Key (`user_profiles.userId`) | Associated user |
| `method_type`    | Enum     | Not Null, Values: `totp`, `sms`, etc. | MFA method type |
| `secret`         | String   | Nullable                  | MFA secret (e.g., TOTP secret) |
| `is_active`      | Boolean  | Not Null, Default: true   | Active status      |
| `createdAt`      | DateTime | Not Null, Default: Now    | Creation timestamp |
| `updatedAt`      | DateTime | Not Null, Default: Now    | Update timestamp   |

## Key Aspects

### Implementation Steps
1. **Set Up Password Hashing**:
   - Use `bcrypt` to hash passwords securely before storing them in `auth_providers`.
   - Install: `npm install bcrypt`.

2. **Implement Username/Password Login**:
   - Allow users to log in with their username or email and password.
   - Verify the password using `bcrypt.compare`.

3. **Enable 2FA**:
   - Allow users to enable 2FA via their account settings.
   - For TOTP: Generate a secret using `speakeasy` and store it in `mfa_methods`.
   - Provide a QR code for users to scan with an authenticator app (e.g., Google Authenticator).

4. **Authenticate with 2FA**:
   - After password verification, prompt the user for their 2FA code.
   - Validate the TOTP code using the stored secret or send an SMS code for verification.

5. **Session Management**:
   - Use `express-session` or JWT to manage the session after successful authentication.
   - Example with JWT:
     ```javascript
     const token = jwt.sign({ userId: user.userId }, 'your-secret');
     res.cookie('token', token, { httpOnly: true });
     ```

### Security Considerations
- **Password Security**:
  - Hash passwords using `bcrypt` with a salt round of 10.
  - Enforce password policies: minimum length of 8 characters, require special characters, and enforce expiration every 90 days.
- **Rate Limiting**:
  - Use `express-rate-limit` to limit login attempts and prevent brute-force attacks.
- **Session Management**:
  - Use secure session management with JWT or `express-session` to protect user sessions.

### Libraries
| Library            | Purpose                     | Documentation Link             |
|--------------------|-----------------------------|--------------------------------|
| `bcrypt`           | Password hashing            | https://www.npmjs.com/package/bcrypt |
| `speakeasy`        | TOTP generation for 2FA     | https://www.npmjs.com/package/speakeasy |
| `express-rate-limit`| Rate limiting for security  | https://www.npmjs.com/package/express-rate-limit |
| `jsonwebtoken`     | JWT-based session management| https://www.npmjs.com/package/jsonwebtoken |

## Flow Diagram

The authentication process with 2FA can be visualized as follows (using Mermaid in a compatible Markdown renderer):
```
sequenceDiagram
    User->>Express: POST /login (username, password)
    Express->>Bcrypt: Verify password
    Bcrypt-->>Express: Match result
    Express->>Sequelize: Query mfa_methods
    Sequelize->>MySQL: SELECT 2FA method
    MySQL-->>Sequelize: TOTP secret
    Sequelize-->>Express: 2FA details
    Express->>User: Prompt for 2FA code
    User->>Express: Submit TOTP code
    Express->>Speakeasy: Verify TOTP code
    Speakeasy-->>Express: Validated
    Express-->>User: Session token
```

## Integration with Other Auth Methods

- **OAuth and SSO**: Username/password with 2FA will coexist with OAuth (e.g., Google login) and SSO (e.g., Okta). After OAuth/SSO login, users can enable 2FA for additional security.
- **Passkeys**: 2FA can serve as a fallback if passkey authentication (WebAuthn) fails or is unsupported by the user’s device.

## Future Enhancements

- **Password Reset**:
  - Add password reset functionality via email verification.
- **Additional 2FA Methods**:
  - Support more 2FA methods, such as email verification.
- **Account Lockout**:
  - Implement account lockout after a specified number of failed login attempts (e.g., 5 attempts).