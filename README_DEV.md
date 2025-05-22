// README.md

daysave.app v1.0.1
A privacy-focused web application for managing content and contacts, with support for web, mobile, and browser extensions.

Setup
Clone the repository: git clone <repo-url>
Install dependencies: npm install
Copy .env.example to .env and fill in environment variables.
Start the app: npm start
DevContainer
Use Docker Desktop and VS Code to run the app in a DevContainer. See .devcontainer for configuration.

Tests
Run tests with: npm test

[Coverage Badge Placeholder]

Documentation
See docs/ for diagrams, reports, and presentations.

// .vscodeconfig/settings.json
{
"plantuml.diagramsRoot": "docs/diagrams/src",
"plantuml.exportOutDir": "docs/diagrams/out",
"plantuml.server": "http://localhost:8080"
}

Show in sidebar
Step 2: Database Schema and Migrations
Description: Implement the database schema using Sequelize models and migrations. Set up UUID primary keys, encryption for sensitive fields, and seed data.
Effort: 2-3 days
Dependencies: Step 1
Tasks:

Create Sequelize models for all tables (user_profiles, auth_providers, etc.).
Define migrations for schema creation.
Implement encryption for sensitive fields (e.g., hashed_password, email).
Create seed scripts for initial data (e.g., roles, permissions, social providers).

Step 3: Authentication and Authorization
Description: Implement flexible authentication (local, OAuth, passkey) and 2FA (TOTP, SMS, email, backup codes) using Passport.js. Set up RBAC with granular permissions.
Effort: 3-4 days
Dependencies: Step 2
Tasks:

Configure Passport.js strategies in src/config/passport.js for local, Google, Microsoft, GitHub, Apple, X, Facebook, Instagram, and passkey authentication.
Create authController.js for login, registration, 2FA setup/verification, and secure password reset using 2FA methods.
Implement authMiddleware.js for RBAC and permission checks.
Set up routes in authRoutes.js.
Assign the first registered user as super_admin with all permissions and default new users as trial_member.


Step 4: Content Management
Description: Build the content browsing and manipulation system, including tagging, commenting, and sharing features.
Effort: 3-4 days
Dependencies: Step 3
Tasks:

Create contentController.js for CRUD operations.
Implement filtering by tag, search, date, content type, and source.
Set up routes for content management.
Add batch manipulation (delete, edit, archive, share).
Step 5: Contact Management
Description: Implement the contact system, including import/export, groups, and multi-field support (phone, email, address, social profiles).
Effort: 2-3 days
Dependencies: Step 3
Tasks:

Create contactController.js for contact CRUD and group management.
Implement CSV import with validation.
Add mobile contact sync opt-in.
Set up routes for contact management.
Step 6: Frontend (Web UI)
Description: Build responsive EJS templates with a uniform navbar, footer, and blog-style content display. Use provided colors and include teaser/registration pages.
Effort: 3-4 days
Dependencies: Step 4, Step 5
Tasks:

Create views/partials for navbar and footer.
Implement home.ejs, dashboard.ejs, teaser.ejs, register.ejs, etc.
Style with CSS in public/css/style.css using #FFD05D, #20D6D1, #16C3C6, #008AA0.
Add client-side JS for dynamic filtering and batch actions.
Step 7: Subscriptions and Payments
Description: Implement trial and subscription logic with PayPal and Stripe integration.
Effort: 2-3 days
Dependencies: Step 3
Tasks:

Create subscriptionController.js for managing plans and payments.
Integrate PayPal and Stripe SDKs.
Set up routes for subscription management.
Implement grace period logic.
Step 8: Monitoring and Auditing
Description: Add fingerprinting, usage statistics, and audit logging for all transactions.
Effort: 2 days
Dependencies: Step 3
Tasks:

Implement fingerprintMiddleware.js for tracking user details (IP, locale, etc.).
Create auditController.js for logging transactions.
Set up admin routes for viewing stats and logs.
Step 9: Mobile Apps
Description: Develop iOS and Android apps using a framework like React Native, sharing the web app’s API.
Effort: 5-7 days
Dependencies: Step 6
Tasks:

Set up React Native projects in mobile/ios and mobile/android.
Implement core features (content browsing, contact management).
Integrate authentication and 2FA.
Step 10: Browser Extensions
Description: Build Chrome, Edge, and Firefox extensions for content submission and notifications.
Effort: 3-5 days
Dependencies: Step 6
Tasks:

Create manifest.json and scripts for each extension.
Implement content submission from web pages.
Add notification support for reminders.
Step 11: Testing
Description: Write unit and integration tests for backend and frontend, using mocked Sequelize models.
Effort: 2-3 days
Dependencies: Step 8
Tasks:

Create test/auth.test.js and other test files.
Mock Sequelize models for unit tests.
Add coverage reporting to README.md.
Step 12: CI/CD and Deployment
Description: Set up GitHub Actions for CI/CD, Let’s Encrypt for SSL, and monitoring for deployments.
Effort: 2-3 days
Dependencies: Step 11
Tasks:

Create .github/workflows/nodejs.yml for testing and deployment.
Configure Let’s Encrypt in docker-compose.yml.
Set up monitoring (e.g., Prometheus) in DevContainer.



docker run -e 'ACCEPT_EULA=Y' \       
-e 'MSSQL_SA_PASSWORD=5984Getto’!!! \
-e 'TZ=America/Los_Angeles' \
-p 1433:1433 \
--name sqldocker \
--hostname sqldocker \
-v /Users/aeg/Documents/Docker/MSSqlServer/SQLVolume:/var/opt/mssql \
-d mcr.microsoft.com/mssql/server:2022-preview-ubuntu-22.04