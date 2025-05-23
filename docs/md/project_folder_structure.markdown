# Daysave Project Folder Structure

This document outlines the folder structure of the Daysave app to help developers understand the organization of the codebase.

## Folder Hierarchy Diagram

The folder structure can be visualized as follows (using Mermaid in a compatible Markdown renderer):
```
graph TD
    A[Root Directory] --> B[.devcontainer/]
    A --> C[package.json]
    A --> D[app.js]
    A --> E[.gitignore]
    A --> F[.env]
    A --> G[src/]
    A --> H[views/]
    A --> I[public/]
    A --> J[docs/]
    
    B --> K[devcontainer.json]
    B --> L[docker-compose.yml]
    
    G --> M[controllers/]
    G --> N[middlewares/]
    G --> O[models/]
    G --> P[routes/]
    G --> Q[seeders/]
    
    M --> R[contentController.js]
    M --> S[contactController.js]
    
    N --> T[authMiddleware.js]
    
    O --> U[user_profiles.js]
    O --> V[content.js]
    O --> W[...other models]
    
    P --> X[contentRoutes.js]
    P --> Y[contactRoutes.js]
    P --> Z[authRoutes.js]
    
    Q --> AA[seedDatabase.js]
    
    H --> AB[content/]
    H --> AC[contact/]
    H --> AD[auth/]
    
    AB --> AE[index.ejs]
    AC --> AF[index.ejs]
    AD --> AG[login.ejs]
```

## Root Directory

- **.devcontainer/**: Contains Docker configuration files for the development environment.
  - `devcontainer.json`: Configures the VS Code Dev Container settings.
  - `docker-compose.yml`: Defines services for the app and MySQL database.
- **.gitignore**: Specifies files to ignore in Git (e.g., `node_modules`, `.env`).
- **.env**: Stores environment variables (e.g., `DB_HOST`, `PORT`) for configuration.
- **package.json**: Defines project dependencies (e.g., Express, Sequelize) and scripts (e.g., `start`, `seed`).
- **app.js**: Main entry point of the application, sets up Express and starts the server.
- **docs/**: Contains project documentation.
  - `md/`: Markdown files for project documentation (e.g., `project_folder_structure.md`).

## Source Code

- **src/**: Contains the main source code for the application.
  - **controllers/**: Business logic for handling HTTP requests.
    - `contentController.js`: Handles content-related operations (e.g., CRUD for notes).
    - `contactController.js`: Handles contact-related operations (e.g., CRUD for contacts).
  - **middlewares/**: Custom middleware for request processing.
    - `authMiddleware.js`: Placeholder for authentication logic (currently allows all requests).
  - **models/**: Sequelize models mapping to database tables.
    - `user_profiles.js`: Defines the `UserProfiles` model for user data.
    - `content.js`: Defines the `Content` model for user-generated content.
    - *(Other model files for `content_sources`, `auth_providers`, etc.)*
  - **routes/**: Express routes for handling HTTP requests.
    - `contentRoutes.js`: Routes for content-related endpoints (e.g., `/content`, `/content/create`).
    - `contactRoutes.js`: Routes for contact-related endpoints (e.g., `/contact`, `/contact/create`).
    - `authRoutes.js`: Routes for authentication (e.g., `/login`, `/logout`).
  - **seeders/**: Scripts for seeding the database with initial data.
    - `seedDatabase.js`: Populates the database with sample users, content, contacts, etc.

## Views and Static Assets

- **views/**: EJS templates for rendering HTML pages.
  - `content/`: Templates for content-related pages.
    - `index.ejs`: Displays a list of content items.
    - `create.ejs`, `show.ejs`, `edit.ejs`: For creating, viewing, and editing content.
  - `contact/`: Templates for contact-related pages.
    - `index.ejs`: Displays a list of contacts.
    - `create.ejs`, `show.ejs`, `edit.ejs`: For managing contacts.
  - `auth/`: Templates for authentication pages.
    - `login.ejs`: Login page template.
- **public/**: Static assets served to the client.
  - Contains CSS, JavaScript, and image files (currently minimal, to be expanded as needed).