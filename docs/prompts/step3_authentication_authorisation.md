As an experienced full-stack developer, implement authentication and authorization for daysave.app v1.0.1, a privacy-focused Node.js web application using Express and Passport.js. The implementation should include:

1. A `src/config/passport.js` file configuring Passport.js with strategies for:
   - Local authentication (username/password with bcryptjs hashing).
   - OAuth 2.0 for Google, Microsoft, GitHub, Apple, X (Twitter), Facebook, and Instagram using respective passport strategies.
   - Passkey authentication (placeholder with JSON storage in auth_providers.passkey_data).
   - Session management with express-session.
2. A `src/controllers/authController.js` file with methods for:
   - `register`: Handles username/password and OAuth registration, assigning `trial_member` role (first user gets `super_admin`).
   - `login`: Authenticates users with local/OAuth/passkey, supporting 2FA verification.
   - `setup2FA`: Configures TOTP, SMS, email, or backup codes, storing in mfa_methods.
   - `verify2FA`: Verifies 2FA codes.
   - `resetPassword`: Secure reset using 2FA authentication.
3. A `src/middlewares/authMiddleware.js` file with:
   - `isAuthenticated`: Ensures user is logged in.
   - `checkPermission`: Enforces RBAC with least privilege (e.g., checks `role_permissions` for `access_admin_page`).
4. A `src/routes/authRoutes.js` file defining endpoints:
   - GET/POST `/login`, `/register`, `/logout`.
   - GET `/oauth/:provider` for OAuth flows.
   - GET/POST `/2fa/setup`, `/2fa/verify`.
   - GET/POST `/reset-password`.
5. Ensure:
   - Encryption for passwords using bcryptjs.
   - 2FA methods stored as JSON in mfa_methods.config.
   - RBAC integrates with Sequelize models (roles, permissions, user_roles).
   - Trial notification logic (email/notification 3 days before trial end).
   - JSDoc comments for documentation.
   - Version: daysave.app v1.0.1 mentioned in comments.
   - Modular design for future microservices (e.g., separate auth service).

Wrap the entire code in an <xaiArtifact> tag with a unique UUID, title "Authentication and Authorization", and contentType "text/plain".