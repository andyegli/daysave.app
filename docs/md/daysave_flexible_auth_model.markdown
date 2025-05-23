# Daysave Flexible Authentication Model

Daysave implements a flexible authentication model to support multiple authentication methods, including local authentication, OAuth, SSO, passkeys, and more. This document outlines the design and implementation.

## Overview

The authentication system is designed to be modular, allowing users to authenticate using different methods based on their preferences. The system uses a combination of database tables and middleware to manage authentication.

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

## Authentication Methods

- **Local Authentication**:
  - Uses username/password with hashed passwords (using `bcrypt`) stored in `auth_providers`.
- **OAuth 2.0**:
  - Supports Google, GitHub, etc., with provider-specific user IDs stored in `auth_providers`.
- **SSO**:
  - Single Sign-On support (planned for future implementation).
- **Passkeys**:
  - Passwordless authentication using WebAuthn (planned for future implementation).

## Implementation Details

- **Middleware**:
  - Authentication middleware (`authMiddleware.js`) verifies user credentials or tokens.
  - Process: The middleware checks for a valid session or token, retrieves the user from `user_profiles`, and validates the authentication method via `auth_providers`.
- **Routes**:
  - Authentication routes (`authRoutes.js`) handle login, logout, and provider-specific flows (e.g., OAuth redirect).
- **Models**:
  - The `auth_providers` model associates authentication methods with users via `user_profile_id`.

## Session Management

- **Current State**: The app currently lacks session management (placeholder middleware allows all requests).
- **Planned Implementation**:
  - Use `express-session` or JWT (JSON Web Tokens) to manage authenticated sessions.
  - Store session tokens in the browser (cookies) and validate them on each request.

## Flow Diagram

A flow diagram can illustrate the authentication process (e.g., using Mermaid in a compatible Markdown renderer):
```
sequenceDiagram
    User->>Express: POST /login (credentials)
    Express->>AuthMiddleware: Verify credentials
    AuthMiddleware->>Sequelize: Query auth_providers
    Sequelize->>MySQL: SELECT provider data
    MySQL-->>Sequelize: Data
    Sequelize-->>AuthMiddleware: Validated user
    AuthMiddleware->>Express: Proceed
    Express-->>User: Redirect to /content
```

## Future Enhancements

- **SSO Support**:
  - Add support for SSO using SAML or OpenID Connect.
- **Passkey Authentication**:
  - Implement passwordless login with WebAuthn passkeys.
- **MFA Support**:
  - Add Multi-Factor Authentication with options like TOTP (e.g., Google Authenticator) or SMS verification.