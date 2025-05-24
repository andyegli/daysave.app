###Functional Requirements###

Functional requirements describe the specific features and behaviors the Daysave app must provide.

***1. User Authentication***
- Signup: Users can sign up with a username, email, password, and optional fields (e.g., firstName).
- Login: Users can log in with their username and password.
- Password Storage: Passwords are stored in the auth_providers table (currently in plain text for testing; should use bcrypt in production).
- Logout: Users can log out, destroying their session.
- Session Management: Authentication uses express-session, storing the authenticated user’s ID in req.session.userId.

***2. Content Management***
- Authenticated users can create, view, edit, filter, search and delete content entries.
- Storage: Content is stored in the content table with fields: id, userId, title, body, source_id.

- Routes:
List content: /api/v1/s/content
View content: /api/v1/s/content/:id
Create content: /api/v1/s/content/create
Edit content: /api/v1/s/content/:id/edit
Delete content: /api/v1/s/content/:id/delete

###3. Contact Management###
- Authenticated users can create, view, edit, filter, seaarch and delete contacts.
- Storage: Contacts are stored in the contacts table with fields: id, user_profile_id, group_id, name, email, phone.

- Routes:
List contacts: /api/v1/s/contact
View contact: /api/v1/s/contact/:id
Create contact: /api/v1/s/contact/create
Edit contact: /api/v1/s/contact/:id/edit
Delete contact: /api/v1/s/contact/:id/delete
Search contact: /api/v1/s/

Association: Contacts are linked to the authenticated user via user_profile_id (from req.session.userId).

###4. Static Pages###
The app provides static pages for:
Landing page: /
Terms of Service: /terms
Privacy Policy: /privacy
Support & Help: /support
About Us: /about

###5. Database Management###
- Database: MySQL, managed via Sequelize.
- Models: Include UserProfiles, AuthProviders, Content, Comments, Contacts, ContactGroups, and others (e.g., Subscriptions, Tags).
Schema Sync: The database schema is synchronized on startup (sequelize.sync({ force: true }) in app.js).
Seeding: A seeder (seed.js) populates the database with test data (e.g., testuser with password123, sample content).

###6. Subscription Management###
- Feature: Users will manage subscription plans (e.g., basic, premium, enterprise).
- Storage: Subscriptions will be stored in the subscriptions table with fields: id, user_profile_id, plan, start_date, end_date.
Routes: Will include /api/v1/s/subscription 
 for managing subscriptions.

###Non-Functional Requirements###
Non-functional requirements describe the quality attributes, constraints, and performance characteristics of the system.

***1. Module System***
- The project must use ECMAScript Modules (ESM) syntax (import and export) exclusively.
- CommonJS syntax (require, module.exports) or other module systems are not allowed.
- All JavaScript files (e.g., app.js, authRoutes.js, models/*.js) adhere to ESM standards.

***2. Technology Stack***

- Node.js Version: Node.js version 22 (specified in the Dockerfile).

- Database: MySQL 8.0 (specified in docker-compose.yml).

- Dependencies:
Managed via npm, with a package-lock.json for consistent dependency resolution.

- Key dependencies: express, ejs, sequelize, mysql2, uuid, bootstrap, express-session, nodemon (for development).

- Front-End Framework: Bootstrap for responsive and consistent design.

***3. Development Environment***

Docker Compose Setup:
- Two services: app (daysave_v1-app-1) and db (daysave_v1-db-1).

- Volume Mounting: Local files are mapped to the container (..:/workspace:cached) for real-time updates.

- Live Reloading: nodemon automatically restarts the application on file changes (command: npm run dev).

- Port Mapping:
App accessible on http://localhost:3000 (ports: - "3000:3000").

- Database exposes port 3306 to the host (ports: - "3306:3306") for GUI access.

*Environment Variables:*

- Configuration (e.g., database credentials) is stored in a .env file, loaded by Docker Compose.

- .env is excluded from version control (in .gitignore).

***4. Security***

- SecureCredentials: Stored in .env (e.g., DB_PASSWORD, - MYSQL_ROOT_PASSWORD), not hard-coded in the image.

- Session Cookies: Configured with httpOnly: true and maxAge: 24 hours in app.js (secure: false for local development; should be true in production with HTTPS).

- Password Storage: Currently plain text for testing; should use bcrypt in production.

***5. Performance and Usability***

- Mobile-Friendliness: All pages and partials (header.ejs, footer.ejs, nav.ejs) are responsive, using Bootstrap’s grid system and custom CSS (public/css/styles.css) with mobile-specific adjustments (e.g., @media (max-width: 576px)).

- Sticky Navbar/Footer:
Navbar remains sticky at the top (position: sticky).
Footer stays at the bottom (min-height: 100vh, display: flex, flex-direction: column).

- Centralized Styling: Inline styles are replaced with classes (e.g., delete-form for forms), with all custom styles in public/css/styles.css.

***6. Development Workflow***

- Live Reloading: Changes to files are reflected immediately via nodemon.

- Database Management: Database can be seeded (npm run seed) or accessed manually (via MySQL commands or GUI on localhost:3306).

- Iteration: Developers can edit, save, and test changes in the browser without manual container restarts or file copying.

***7. Reliability***

- Error Handling: Application handles errors gracefully, with middleware in app.js logging errors and returning a 500 status (Something broke!).

- Sequelize Operations: Handle foreign key constraints (e.g., SET FOREIGN_KEY_CHECKS = 0 during schema sync).

***8. Maintainability***

- Modularity: Code is organized with separate concerns (routes in src/routes/, controllers in src/controllers/, middlewaare in src/middleware, models in src/models/ view in src/views, partials in /src/views/partials, css in public/css, images in /public/images, cient side js in /public/js).


- File Naming: Correct file names are used (e.g., content_sources.js, mfa_methods.js, subscription_grace_periods.js).

- Additional Considerations
Functional Requirements Already Met
User authentication, content/contact management, and static pages are implemented.

- Database schema and seeding are set up, though seeding needs to be run manually after container startup.

