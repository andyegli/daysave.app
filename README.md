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

// README.md
# daysave.app v1.0.1

A privacy-focused web application for managing content and contacts, with support for web, mobile, and browser extensions.

## Setup

1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in environment variables.
4. Start the app: `npm start`

## DevContainer

Use Docker Desktop and VS Code to run the app in a DevContainer. See `.devcontainer` for configuration.

## Tests

Run tests with: `npm test`

[Coverage Badge Placeholder]

## Documentation

See `docs/` for diagrams, reports, and presentations.

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
npm install express sequelize mysql2 dotenv passport passport-google-oauth20 passport-azure-ad passport-github2 passport-appleid passport-twitter-oauth2 passport-facebook bcryptjs express-session ejs body-parser axios uuid

