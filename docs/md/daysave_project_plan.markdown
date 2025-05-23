# Daysave Project Plan

This document outlines the project plan for developing the Daysave app, including milestones, tasks, and timelines.

## Project Overview

Daysave is a web application for managing personal content, contacts, and subscriptions, targeting users who need a simple, privacy-focused tool for organizing their digital life. The key goals are to create a secure, user-friendly app with flexible authentication (local, OAuth, SSO, passkeys) and robust data management using MySQL and Sequelize.

## Milestones

- **Project Plan Submission**: May 25, 2025
- **Development Phase 1 (Setup and Basics)**: June 15, 2025
  - Set up project structure and database schema.
  - Implement basic routing and views.
- **Development Phase 2 (Core Features)**: July 15, 2025
  - Implement authentication (local, OAuth).
  - Add content and contact management features.
- **Development Phase 3 (Advanced Features)**: August 1, 2025
  - Add subscription management.
  - Implement security features (e.g., fingerprinting).
- **Project Submission**: August 16, 2025

## Tasks

### Phase 1: Setup and Basics
- **Duration**: May 25, 2025 - June 15, 2025

| Task                          | Description                          | Status   |
|-------------------------------|--------------------------------------|----------|
| Set up repository             | Create GitHub repo and devcontainer  | Not Started |
| Define database schema        | Design MySQL schema with Sequelize   | Not Started |
| Create basic routes and views | Set up Express routes and EJS views  | Not Started |

### Phase 2: Core Features
- **Duration**: June 16, 2025 - July 15, 2025

| Task                          | Description                          | Status   |
|-------------------------------|--------------------------------------|----------|
| Implement local authentication| Add username/password login          | Not Started |
| Add OAuth authentication      | Support Google, GitHub login         | Not Started |
| Develop content management    | CRUD operations for content          | Not Started |
| Develop contact management    | CRUD operations for contacts         | Not Started |

### Phase 3: Advanced Features
- **Duration**: July 16, 2025 - August 1, 2025

| Task                          | Description                          | Status   |
|-------------------------------|--------------------------------------|----------|
| Implement subscription management | CRUD operations for subscriptions | Not Started |
| Add device fingerprinting     | Implement fingerprinting for security| Not Started |
| Add error handling and logging| Basic error handling and logging     | Not Started |

### Phase 4: Finalization
- **Duration**: August 2, 2025 - August 16, 2025

| Task                          | Description                          | Status   |
|-------------------------------|--------------------------------------|----------|
| Test all features             | Manual and automated testing         | Not Started |
| Fix bugs and polish UI        | Address bugs and improve UI          | Not Started |
| Prepare documentation         | Update `/docs/md` files              | Not Started |
| Submit project for assessment | Submit to GitHub and assessors       | Not Started |

## Timeline

| Date          | Milestone                     |
|---------------|-------------------------------|
| May 25, 2025  | Project plan submission       |
| June 15, 2025 | Phase 1 complete (setup)      |
| July 15, 2025 | Phase 2 complete (core features) |
| August 1, 2025| Phase 3 complete (advanced features) |
| August 16, 2025 | Project submission          |

## Resources

- **Team Members**: Solo project (Andy Egli).
- **Tools**:
  - Docker for containerization.
  - VS Code with Dev Containers for development.
  - GitHub for version control.
- **Dependencies**:
  - Express, Sequelize, MySQL, EJS (see `package.json`).

## Testing Strategy

- **Manual Testing**:
  - Test all routes and features (e.g., content CRUD, login flows) via the UI.
- **Automated Testing**:
  - Planned: Set up unit tests using Jest for controllers and models.
  - Planned: Set up integration tests for authentication flows.

## Risks and Mitigation

- **Risk**: Delays in implementing authentication (e.g., OAuth setup).
  - **Mitigation**: Allocate extra time in Phase 2 and use libraries like `passport.js` to simplify implementation.
- **Risk**: Bugs in advanced features (e.g., fingerprinting).
  - **Mitigation**: Prioritize testing in Phase 4 and implement logging for debugging.