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


// package.json
{
  "name": "daysave-app",
  "version": "1.0.1",
  "description": "Privacy-focused web application for content and contact management",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sequelize": "^6.32.1",
    "mysql2": "^3.6.0",
    "dotenv": "^16.3.1",
    "passport": "^0.6.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-azure-ad": "^4.3.5",
    "passport-github2": "^0.1.12",
    "passport-appleid": "^1.0.0",
    "passport-twitter-oauth2": "^1.0.0",
    "passport-facebook": "^3.0.0",
    "bcryptjs": "^2.4.3",
    "express-session": "^1.17.3",
    "ejs": "^3.1.9",
    "body-parser": "^1.20.2",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2"
  },
  "engines": {
    "node": "20.x"
  }
}

// .env.example
DATABASE_URL=mysql://user:password@localhost:3306/daysave
SESSION_SECRET=your_session_secret
PORT=3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret

// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Sequelize database configuration
 * @returns {Sequelize} Configured Sequelize instance
 */
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL for data in transit
    },
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true,
    paranoid: true, // Soft deletes
  },
});

module.exports = sequelize;

// .devcontainer/devcontainer.json
{
  "name": "daysave-app",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  "extensions": [
    "dbaeumer.vscode-eslint",
    "webfreak.plantuml"
  ],
  "settings": {
    "plantuml.server": "http://plantuml:8080"
  }
}

// .devcontainer/Dockerfile
FROM node:20

WORKDIR /workspace
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

// .devcontainer/docker-compose.yml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ..:/workspace:cached
    environment:
      - DATABASE_URL=mysql://user:password@mysql:3306/daysave
    depends_on:
      - mysql
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: daysave
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
  plantuml:
    image: plantuml/plantuml-server:latest
    ports:
      - "8080:8080"

// .gitignore
node_modules/
.env
dist/
.devcontainer/build/

// .nvmrc
20

// .vscodeconfig/settings.json
{
  "plantuml.diagramsRoot": "docs/diagrams/src",
  "plantuml.exportOutDir": "docs/diagrams/out",
  "plantuml.server": "http://localhost:8080"
}

Dependencies: Ensure sequelize, mysql2, uuid, and bcryptjs are installed (npm install sequelize mysql2 uuid bcryptjs)

Important steps
sequelize init

Migration and seeding:

Execution: Run migrations with npx sequelize db:migrate and seeds with npx sequelize db:seed --seed scripts/seed.js after setting up your Sequelize CLI configuration (sequelize init if not already done).
Dependencies: Ensure sequelize, mysql2, uuid, and bcryptjs are installed (npm install sequelize mysql2 uuid bcryptjs)
Order: The migrations are named with the same timestamp (20250519) to ensure they run in a single batch. Adjust timestamps if you need sequential execution.
Seed Data: The seed script populates roles, permissions, role_permissions (for super_admin), social_providers, payment_providers, and content_sources. Additional seed data (e.g., sample users, content) can be added upon request.
Cleanup: The down function in the seed script reverses the insertions in the reverse order of creation to avoid foreign key constraint issues.

Authentication and Authorization Files
src/config/passport.js step 3
src/controllers/authController.js >step 3
src/middlewares/authMiddleware.js > step 3
src/routes/authRoutes.js > step 3
views/login.ejs > setp 6



npm install -g sequelize-cli nodemon dotenv
npm install --save express sequelize mysql2 dotenv passport passport-google-oauth20 passport-azure-ad passport-github2 passport-appleid passport-twitter-oauth2 passport-facebook bcryptjs express-session ejs body-parser axios uuid csv-parse multer

The app.js now uses sequelize.sync() without force: true, so you should run the migrations from Step 2 manually within the container:
Install Sequelize CLI globally (npm install -g sequelize-cli).
Run npx sequelize db:migrate and npx sequelize db:seed --seed scripts/seed.js after the container starts.

Build and run the Docker environment with docker-compose -f .devcontainer/docker-compose.yml up --build.
Test the application at http://localhost:3000.



docker-compose -f .devcontainer/docker-compose.yml down
docker volume rm daysave_v1_db_data
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -q)
docker-compose --project-name daysave_v1 -f .devcontainer/docker-compose.yml up -d --build


docker-compose -f .devcontainer/docker-compose.yml up -d
docker exec -it daysave_v1-app-1 node seed.js

Warning: This will delete all data in the database and remove all Docker artifacts. If you have data or images you need to preserve, back them up first.
docker-compose -f .devcontainer/docker-compose.yml down
docker volume rm daysave_v1_db_data
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -q)
Warning: This will delete all data in the database and remove all Docker artifacts. If you have data or images you need to preserve, back them up first.



docker-compose --project-name daysave_v1 -f .devcontainer/docker-compose.yml down
docker-compose --project-name daysave_v1 -f .devcontainer/docker-compose.yml up -d --build



Step 1: Commands to Completely Rebuild the Container and Seed the Database
To rebuild the container and reseed the database, follow these steps:

1. Stop and Remove the Existing Containers
This ensures a clean slate by stopping and removing the existing containers for the daysave_v1 project.

docker compose --project-name daysave_v1 -f .devcontainer/docker-compose.yml down
E
xplanation:
docker compose: Uses the integrated Docker Compose command (as docker-compose is deprecated in your Docker Desktop version).
--project-name daysave_v1: Specifies the project name to avoid conflicts with other Docker projects.
-f .devcontainer/docker-compose.yml: Points to the docker-compose.yml file in the .devcontainer directory.
down: Stops and removes the containers, networks, and volumes defined in the compose file.

2. Rebuild and Start the Containers
This rebuilds the containers from scratch, ensuring all changes (e.g., updated dependencies, code) are applied.

docker compose --project-name daysave_v1 -f .devcontainer/docker-compose.yml up -d --build --no-cache

Explanation:
up: Starts the containers defined in the compose file.
-d: Runs the containers in detached mode (in the background).
--build: Forces a rebuild of the container images.
--no-cache: Ensures the rebuild doesn’t use cached layers, incorporating all changes.

3. Seed the Database
After the containers are running, seed the database to populate it with the test data (e.g., testuser with password123).

docker exec -it daysave_v1-app-1 npm run seed

Explanation:
docker exec -it daysave_v1-app-1: Runs a command inside the daysave_v1-app-1 container interactively.
npm run seed: Executes the seed script defined in package.json, which runs node ./src/seeders/seed.js to populate the database.
Step 2: Verify the Application After Rebuild
Check Container Status
Confirm the containers are running:


docker ps

Expected Output:
You should see daysave_v1-app-1 and daysave_v1-db-1 with a status of Up and port mapping 3000:3000 for the app container.

Check the Logs
Verify the application started successfully and the database was seeded:

docker logs daysave_v1-app-1
Expected Output:
Look for:
text

Server running on port 3000
Models loaded: [ ... ]
Database seeded successfully!
Ensure there are no errors related to model loading or database setup.

Test the Application
Login:
Access http://localhost:3000/login.
Use testuser and password123.
Verify you’re redirected to /content.


Debgging:
docker exec -it daysave_v1-app-1 bash
mysql -u root -p -h db -P 3306
  USE daysave_db;