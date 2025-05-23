# Daysave References

This document lists references and resources used during the development of the Daysave app, as well as resources for planned features.

## Documentation

- **Express.js Documentation**: https://expressjs.com/
- **Sequelize Documentation**: https://sequelize.org/
- **MySQL Documentation**: https://dev.mysql.com/doc/
- **EJS Documentation**: https://ejs.co/
- **Docker Documentation**: https://docs.docker.com/

## Tutorials and Guides

- **Node.js and Express Tutorial**: https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm
  - Relevance: Guided the setup of Express routing and middleware for Daysave.
- **Sequelize with MySQL Guide**: https://www.bezkoder.com/node-js-express-sequelize-mysql/
  - Relevance: Helped configure Sequelize for MySQL and define models in `/src/models`.
- **Docker Compose Guide**: https://docs.docker.com/compose/gettingstarted/
  - Relevance: Assisted in setting up `docker-compose.yml` for the devcontainer environment.

## Libraries

| Library            | Purpose                     | Documentation Link             |
|--------------------|-----------------------------|--------------------------------|
| `bcrypt`           | Password hashing            | https://www.npmjs.com/package/bcrypt |
| `passport.js`      | OAuth authentication        | http://www.passportjs.org/     |
| `express-session`  | Session management          | https://www.npmjs.com/package/express-session |
| `jsonwebtoken`     | JWT-based authentication    | https://www.npmjs.com/package/jsonwebtoken |

## Planned Features References

- **WebAuthn/Passkey Authentication**:
  - WebAuthn Guide: https://webauthn.guide/
  - `@simplewebauthn/server`: https://www.npmjs.com/package/@simplewebauthn/server
- **Device Fingerprinting**:
  - FingerprintJS: https://fingerprint.com/
  - FingerprintJS Documentation: https://dev.fingerprint.com/docs