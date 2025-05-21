As an experienced full-stack developer, create a Node.js project setup for the daysave.app v1.0.1, a privacy-focused web application. The setup should include:

1. A `package.json` with dependencies: express, sequelize, mysql2, dotenv, passport, passport-google-oauth20, passport-azure-ad, passport-github2, passport-appleid, passport-twitter-oauth2, passport-facebook, bcryptjs, express-session, ejs, body-parser, axios, nodemon (dev). Use Node.js 20.x.
2. A `.env.example` file defining required environment variables: DATABASE_URL, SESSION_SECRET, PORT, and placeholders for OAuth client IDs/secrets (Google, Microsoft, GitHub, Apple, X, Facebook, Instagram).
3. A `src/config/database.js` file configuring Sequelize with MySQL, using environment variables and enabling encryption for data at rest.
4. A `.devcontainer` folder with:
   - `devcontainer.json` for VS Code, mapping to a Node.js 20.x container with MySQL and PlantUML server.
   - `Dockerfile` for the app container, installing Node.js and dependencies.
   - `docker-compose.yml` defining services for the app and MySQL.
5. A `.gitignore` excluding `.env`, `node_modules`, and DevContainer build artifacts.
6. A `.nvmrc` specifying Node.js 20.x.
7. A `README.md` with project overview, setup instructions, and placeholders for test/coverage badges.
8. A `.vscodeconfig/settings.json` enabling PlantUML preview.

Ensure:
- Modular structure with `src`, `public`, `views`, `docs`, etc., as per the provided project layout.
- Environment variables are loaded using dotenv.
- Code is well-documented with JSDoc comments.
- Sequelize configuration supports UUID primary keys and encrypted fields.
- DevContainer supports remote development with Docker Desktop.
- Version: daysave.app v1.0.1 is mentioned in documentation.

Wrap the entire code in an <xaiArtifact> tag with a unique UUID, title "Project Setup Files", and contentType "text/plain".