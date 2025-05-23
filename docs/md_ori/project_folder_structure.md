*** daysave.app v1 project folder structure ***

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