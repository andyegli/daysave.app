daysave.app/                        # Project structure and files
│
├── .devcontainer/                  # VS Code Dev Container files
│   ├── devcontainer.json           # VS Code Dev Container settings
│   ├── Dockerfile                  # Dockerfile for app container
│   └── docker-compose.yml          # Docker-Compose for DevContainers
│
├── .vscodeconfig/                  # holds VS code config settings
│   └── setings.json                # config settings required for PlandUML Preview
│
├── .github/                        # GitHub actions/workflows (CI/CD)
│   └── workflows/
│       └── nodejs.yml              # Example GitHub Actions workflow
│
├── public/                         #Static files
│   ├── css/                        # CSS files (e.g., style.css)
│   ├── images/                     # App images (e.g., logo.png)
│   └── js/                         # Optional client-side JavaScript
│
├── src/                            # Main app source code
│   ├── config/                     # Config files
│   │   ├── database.js             # Sequelize DB config
│   │   ├── passport.js             # Passport auth setup
│   │   └── config.js               # App-wide settings/env logic
│   │
│   ├── controllers/                # Business logic
│   │   └── authController.js
│   │
│   ├── middlewares/               # Custom Express middleware
│   │   └── authMiddleware.js
│   │
│   ├── models/                     # Sequelize models
│   │   └── user.js
│   │
│   ├── routes/                     # Express routes
│   │   └── authRoutes.js
│   │
│   ├── views/                      # EJS templates
│   │   ├── partials/               # header.ejs, footer.ejs
│   │   └── pages/                  # home.ejs, dashboard.ejs
│   │
│   └── app.js                      # Main Express app entry
│
├── mobile/                         # Mobile applications
│   ├── ios/                        # iPhone and iPad app (Xcode project)
│   └── android/                    # Android app (Android Studio project)
│
├── browser-extensions/             # Web browser add-ons
│   ├── chrome/                     # Chrome extension files (manifest.json, etc.)
│   ├── edge/                       # Microsoft Edge extension
│   └── firefox/                    # Firefox extension
│
├── docs/
│   ├── diagrams/
│   │   ├── src/                    # holds PlantUML diagrams like ERD, use-cases, and domain models.
│   │   │   ├── schema.puml
│   │   │   ├── usecases.puml
│   │   │   └── domain_model.puml
│   │   └── out/                    # Exported diagrams (e.g., PNG, SVG)
│   │
│   ├── reports/                    # Project docs: .md, .docx files, etc.
│   │   ├── project-plan.md
│   │   ├── references.docx
│   │   └── final-report.pdf
│   │
│   └── presentations/             # Slides (e.g., PPTX, PDF)
│       ├── kickoff-slides.pptx
│       └── final-presentation.pdf
│
├── test/                           # Unit/integration tests
│   └── auth.test.js
│
├── scripts/                        # Setup or DB seed scripts
│   └── seed.js
│
├── .env                            # active file containing Environment variables and secrets never include in 
│                                   # never include in devcontainer builds or git push
├── .env.example                    # sample file containing all Environment variables / Secrets required
├── .gitignore                      # files and folders not sent to GitHub
├── .nvmrc                          #contains node version use by
├── package.json
└── README.md


src/ keeps all logic separated from infrastructure.

public/ is exposed via express.static().

views/partials encourages reusable EJS components.

Use .github/workflows/ for CI/CD pipelines.

docs/diagrams/src/ holds PlantUML diagrams like ERD, use-cases, and domain models.

docs/reports/ is ideal for project plans, markdown notes, and formal documents.

docs/presentations/ holds pitch decks and slides.

.devconterner/devcontainer.json maps to the docker-compose and Dockerfile cleanly.

.vscodeconfig/settings.jsone has setting for the PlandUML preview to render on the l






Purpose	Folder Path	Why It Goes There
Images	public/images/	Publicly accessible via /images/...
CSS	public/css/	Static assets served via /css/style.css
Partials	views/partials/	Included in other EJS files using <%- include %>

We like to use a versioning system that updates file and database versions automatically when updated
We want all user data to be encrypted in transit and at rest to prevent it to be leaked 
We have registered the domain dayside.app and would like to build a responsive app for mobile and web users.
We like a well structured project including extensively documented code and a detailed readme describing the application and deployment
We like a granular permission system 
We like trial and subscription model
We like multiple payment options
We would like to capture statistics on the use of the system 
We want to use UUID’s for all primary keys to prevent id guessing
We like to include unit testing
Integrate all neccesary conepts to accomodate:
├── mobile/                         # Mobile applications
│   ├── ios/                        # iPhone and iPad app (Xcode project)
│   └── android/                    # Android app (Android Studio project)
│
├── browser-extensions/             # Web browser add-ons
│   ├── chrome/                     # Chrome extension files (manifest.json, etc.)
│   ├── edge/                       # Microsoft Edge extension
│   └── firefox/                    # Firefox extension
Consider Modular Codebase, structure code into small, testable units (e.g., controllers, services, models)
Consider Dependency Injection: Avoid hardcoded dependencies. Use dependency injection to make mocking easier.
Consider Separation of Concerns (SoC), logic should be in service classes or utilities, not embedded in route handlers or views.
Document your testing strategy, add test and coverage badges to your README
Recommend a suitable tooling setup: choose tools that suit the stack
Avoid real DBs for unit tests. Use mocked Sequelize models
build project for  devcontainer for remote development micro service architecture  and modern devops style deployments and monitoring
Consider the following:
Flexible authentication support for multiple authentication method’s such as password, out, sso, passkey 
Flexible 2FA supporting multiple authentication metopes such as top, sms,emai,backup codes
Roll Based Access Control
Supporting concept of Least privileges 
Detailed monitoring and auditing of all transactions 
We like to be enable / disable debug flags for additional detailed log output during runtime
Use Lets Encrypt to generate and auto renew SSL Certificates
Enable tracking and timestamped fingerprinting including locale, timezone, ip,window size, browser details, os details with json based history fields for easier debugging 
User_profiles submit social media or web urls
User_profiles tag and comment submitted urls
User_rofile have contact in the style of iPhone each contacts supporting multiple addresses, phone numbers, social profiles, notes
The social_providers should include(WhatApp, WaBusines,Teams,Zoom,Threema,LinkedIn,Messager,Telegram,Discord,Snapchat, Facebook,Threads, Slack,GitHub,Signal,Gmail,Simple, Instagram, TikTok, Revolut
User_profiles can comment, tag and share content with contacts via read only page
Contacts also have type so user_profile associate its own contact
Contacts also have a source (user, import, mobile)
Contacts can also register with the system and become a user_profile so they can comment and tag content that is shared with then as well as their own
The contact address country should include a list of countries of the world
The contact phone number country code should include a list of country codes of the world 
Admins view usage statistics, curate submits, view audit logs 
The permission include: access_admin_page, create_own_conent edit_own_conent, share_content, create_contacts, 
Create well documented a modern nodejs app with express featuring, API and MVC based  EJS pages 
Use includes for navbar and footer css for a better structure
Use includes for css for a better structure
Use Sequalize, migrate.js and orm to prevent sql injection attacks easier change to models
The pages should be using the colours #FFD05D,#20D6D1,#16C3C6, #008AA0
The company logo is attached
Call this the dayside.app v1.0.1 include the version with the documentation
The default profile role is guest and can only access the teaser page and from there the registration page plus, the pages in the future and the menu and menu items	 of those two pages	
Once Registered the first registered user is assigned the super admin role which as all permissions
Registered users get assigned trial_member and can have permissions to create and manipulate their own content
Once trial member is<<<<<<<<<<<<<<<<<<<<,>>>>>>>>>>>>>>>>>>>> 
Pages should have a uniform navbar a the top including drop-down menu on the left and profile icon leading to user_profile detail page
Pages should include footer with contact details and links to privacy policy page, terms of service and get help page
There should be a teaser Page promoting the features and benefits of the app featuring a trial me button leading to the register page
Registration can be using username and password, google, Microsoft, Apple, Facebook, X, Instagram and should feature the respective logo
The registration page should also have a link to a secure password reset feature using the user_profiles 2FA methods to authenticate the user
once registered and or logged in the user is sent to the main content page
This page allows the user to browse the submitted content
It also has the option to narrow down the visible content by tag, string search, date time period, content type and source channel
The page shows the content in blog style fashion organised in vertical blocks with a title, a preview on the left, to the right of the preview, with tags and comments below
Each tag and comment are framed in different colours depending on the source. Sources can be the user_profile, a contact or the AI backend once implemented
There is a option to or select the content items to allow batch manipulation of selected content items
The page features buttons to delete, edit, archive content and share with contact or group 
The user_profile also has a contact page where he can import, add, update and delete contacts
When mobile devices are used to access the app the user_profile can opt in to sync his local contacts
When accessed via web a import function allows a user to upload a .csv which then is imported in the backend
A sample .csv is made available on the contact import page for the user to download
This page also features the ability to create and delete groups of contacts and allows contacts to be added and removed from group
Finally build the following addons 
├── mobile/                         # Mobile applications
│   ├── ios/                        # iPhone and iPad app (Xcode project)
│   └── android/                    # Android app (Android Studio project)
│
├── browser-extensions/             # Web browser add-ons
│   ├── chrome/                     # Chrome extension files (manifest.json, etc.)
│   ├── edge/                       # Microsoft Edge extension
│   └── firefox/                    # Firefox extension
