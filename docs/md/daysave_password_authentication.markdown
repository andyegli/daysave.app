# Daysave Password Authentication

Daysave plans to implement local password authentication as one of its authentication methods. This document outlines the planned implementation.

## Overview

Local password authentication will allow users to log in using a username or email and a password, with passwords securely hashed using `bcrypt`.

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

1. **Set Up Password Hashing**:
   - Use `bcrypt` to hash passwords before storing them.
   - Example:
     ```javascript
     const hashedPassword = await bcrypt.hash(password, 10);
     ```

2. **Register User**:
   - Collect username, email, and password during registration.
   - Hash the password and store it in `auth_providers` with `provider` set to `'local'`.

3. **Authenticate User**:
   - Compare the provided password with the stored hash:
     ```javascript
     const match = await bcrypt.compare(password, storedHash);
     if (match) {
       // Proceed with authentication
     }
     ```
   - On successful authentication, create a session or JWT.

4. **Session Management**:
   - Use `express-session` or JWT to manage the session.
   - Example with `express-session`:
     ```javascript
     app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));
     ```

## Flow Diagram

The password authentication process can be visualized as follows (using Mermaid in a compatible Markdown renderer):
```
sequenceDiagram
    User->>Express: POST /register (username, email, password)
    Express->>Bcrypt: Hash password
    Bcrypt-->>Express: Hashed password
    Express->>Sequelize: Store in auth_providers
    Sequelize->>MySQL: INSERT auth_providers
    User->>Express: POST /login (username, password)
    Express->>Sequelize: Query auth_providers
    Sequelize->>MySQL: SELECT hashed_password
    MySQL-->>Sequelize: Data
    Sequelize-->>Express: Hashed password
    Express->>Bcrypt: Compare passwords
    Bcrypt-->>Express: Match result
    Express-->>User: Session token
```

## Password Policies

- **Expiration**: Require password changes every 90 days (planned).
- **Reuse Prevention**: Prevent reusing the last 5 passwords (planned).
- **Secure Storage**: Always hash passwords using `bcrypt` with a salt round of 10.

## Future Enhancements

- **Password Strength Validation**:
  - Require a minimum length (e.g., 8 characters), special characters, and numbers.
- **Password Reset**:
  - Implement password reset functionality via email verification.
- **Rate Limiting**:
  - Add rate limiting using `express-rate-limit` to prevent brute-force attacks on login endpoints.