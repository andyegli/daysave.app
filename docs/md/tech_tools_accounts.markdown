# Daysave Tech, Tools, and Accounts

This document lists the technologies, tools, and accounts used in the development of the Daysave app, along with planned integrations.

## Development Environment

- **Node.js Version**: 22.16.0 (used in the devcontainer).
- **Operating System**: Docker container (based on `node:22` image).
- **IDE**: VS Code with Dev Containers extension.

## Current Technologies

| Technology    | Purpose                     | Documentation Link             |
|---------------|-----------------------------|--------------------------------|
| **Node.js**   | Server-side runtime         | https://nodejs.org/en/docs/    |
| **Express.js**| Backend framework for routing and middleware | https://expressjs.com/ |
| **Sequelize** | ORM for MySQL database interactions | https://sequelize.org/ |
| **MySQL**     | Relational database         | https://dev.mysql.com/doc/     |
| **EJS**       | Server-side template rendering | https://ejs.co/ |

## Planned Technologies

| Technology    | Purpose                     | Documentation Link             |
|---------------|-----------------------------|--------------------------------|
| `bcrypt`      | Password hashing            | https://www.npmjs.com/package/bcrypt |
| `passport.js` | OAuth 2.0 for social logins | http://www.passportjs.org/     |
| `speakeasy`   | TOTP generation for 2FA     | https://www.npmjs.com/package/speakeasy |
| `express-rate-limit` | Rate limiting for security | https://www.npmjs.com/package/express-rate-limit |
| `jsonwebtoken`| JWT-based session management| https://www.npmjs.com/package/jsonwebtoken |
| `@simplewebauthn/server` | WebAuthn for passkey authentication | https://www.npmjs.com/package/@simplewebauthn/server |
| `fingerprintjs` | Device fingerprinting      | https://dev.fingerprint.com/docs |

## Tools

| Tool          | Purpose                     | Documentation Link             |
|---------------|-----------------------------|--------------------------------|
| **Docker**    | Containerization            | https://docs.docker.com/       |
| **VS Code**   | Development environment     | https://code.visualstudio.com/docs |
| **GitHub**    | Version control and repository hosting | https://docs.github.com/ |
| **PlantUML**  | Diagram generation (