# Daysave Passkey Authentication

Daysave plans to implement passkey authentication using WebAuthn for passwordless login. This document outlines the planned implementation.

## Overview

Passkey authentication will allow users to log in using biometric authentication (e.g., fingerprint, face recognition) or a PIN, eliminating the need for passwords. WebAuthn, a web standard for secure authentication, enables this by using public key cryptography to authenticate users via passkeys stored on their devices.

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
| `passkey_data`   | JSON     | Nullable                  | Passkey data (e.g., public key) |

## Implementation Steps

1. **Set Up WebAuthn**:
   - Use a library like `@simplewebauthn/server` for server-side WebAuthn support.
   - Install: `npm install @simplewebauthn/server`.

2. **Register Passkey**:
   - Client-side: Use the WebAuthn API to register a passkey:
     ```javascript
     const credential = await navigator.credentials.create({ publicKey: options });
     ```
   - Server-side: Store the public key and related data in `passkey_data`:
     ```json
     {
       "publicKey": "...",
       "credentialId": "..."
     }
     ```

3. **Authenticate with Passkey**:
   - Client-side: Prompt the user for biometric authentication:
     ```javascript
     const assertion = await navigator.credentials.get({ publicKey: options });
     ```
   - Server-side: Verify the signature using the stored public key.

4. **Session Management**:
   - Use `express-session` or JWT to manage the session after authentication.
   - Example with JWT:
     ```javascript
     const token = jwt.sign({ userId: user.userId }, 'your-secret');
     res.cookie('token', token, { httpOnly: true });
     ```

## Flow Diagram

The passkey authentication process can be visualized as follows (using Mermaid in a compatible Markdown renderer):
```
sequenceDiagram
    User->>Express: GET /auth/passkey/register
    Express->>Client: WebAuthn options
    Client->>User: Prompt for biometric
    User-->>Client: Biometric data
    Client->>Express: Public key
    Express->>Sequelize: Store in passkey_data
    Sequelize->>MySQL: INSERT auth_providers
    User->>Express: GET /auth/passkey/login
    Express->>Client: WebAuthn challenge
    Client->>User: Prompt for biometric
    User-->>Client: Signature
    Client->>Express: Signature
    Express->>MySQL: Verify signature
    Express-->>User: Session token
```

## Compatibility

- **Supported Browsers**: WebAuthn is supported in modern browsers (e.g., Chrome, Firefox, Safari, Edge).
- **Fallback**: For unsupported browsers, implement fallback authentication methods (e.g., password or email verification).

## Future Enhancements

- **Multiple Passkeys**:
  - Add support for multiple passkeys per user for flexibility.
- **Fallback Authentication**:
  - Implement fallback methods like email verification if passkey authentication fails.
- **Enhanced Security**:
  - Add device attestation to verify the authenticity of the user’s device.