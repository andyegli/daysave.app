# DaySave.app Project Proposal

**Course**: Certificate in Software Development – MCSD51  
**Assessment**: Future Skills Training – Assessment 1  
**Author**: Andy Egli  
**Date**: May 2025

---

## Contents

- [1. Introduction](#1-introduction)
  - [1.1 Motivation and Inspiration](#11-motivation-and-inspiration)
  - [1.2 Project Team](#12-project-team)
  - [1.3 Outcomes](#13-outcomes)
- [2. Scope](#2-scope)
  - [2.1 Additional Phases (Out of Scope)](#21-additional-phases-out-of-scope)
  - [2.2 Constraints](#22-constraints)
- [3. User Stories and Use Cases](#3-user-stories-and-use-cases)
  - [3.1 User Stories](#31-user-stories)
  - [3.2 Use Cases](#32-use-cases)
- [4. Ethical and Cultural Impact](#4-ethical-and-cultural-impact)
- [5. SDLC - Software Development Life Cycle](#5-sdlc---software-development-life-cycle)
- [6. Project Timeline](#6-project-timeline)
- [7. Diagrams](#7-diagrams)
- [8. References](#8-references)

---

## 1. Introduction

DaySave.app addresses the challenge of rediscovering digital content. Users often lose track of meaningful web and social media content due to inadequate bookmarking tools. DaySave.app allows saving, tagging, commenting, and receiving AI-powered summaries for better organization and recall. With trust, security, and compliance in mind, DaySave is designed to be **self-hosted first**.

### 1.1 Motivation and Inspiration

After years of scripting and tinkering, I joined MCSD51 to gain a structured understanding of software development. DaySave.app is inspired by my personal need to catalog useful content for later use. Discovering similar tools, I saw the opportunity to learn and build a secure, AI-enhanced, Docker-based project with devcontainers and PlantUML support.

### 1.2 Project Team

- **Developer/Sponsor**: Andy Egli  
- **Stakeholders**: Future Skills Academy Tutors  
- **Users**: Individuals who wish to organize digital content for easy future access

### 1.3 Outcomes

- Secure registration/login (email/OAuth)
- Content dashboard with tagging, commenting, sharing
- Contact and contact group management
- Project hosted in Google Cloud (if achievable within scope)
- Clear project structure with WBS, GitHub repository, initial implementation pages

---

## 2. Scope

Phase 1 includes:

- Secure login with email/OAuth (Google)
- Save digital content URLs
- Add metadata (tags, comments, type, platform)
- Tile-style content layout
- Search/sort/filter functionality
- Role-based permissions

**Tech Stack**: Node.js + Express (backend), EJS + Bootstrap (frontend), MySQL/MariaDB (DB), Devcontainers, Google Cloud (target hosting)

### 2.1 Additional Phases (Out of Scope)

- CI/CD and automated testing
- Google Cloud deployment
- Contact sharing, tagging and replies
- UX and accessibility enhancements
- AI integration (summarization, transcription)
- Payment integrations (Stripe, PayPal)
- Scheduled reminders

### 2.2 Constraints

- **Deadline**: 16 August 2025  
- **Resources**: Solo novice developer traveling in Switzerland  
- **Legal**: Adherence to privacy laws (NZ, international)

---

## 3. User Stories and Use Cases

See [docs/md/daysave_user_stories.md](docs/md/daysave_user_stories.md)

### 3.1 User Stories

- As a guest, I want to explore the homepage.
- As a guest, I want to register for a trial.
- As a user, I want to save and categorize content.
- As a user, I want to log in securely.
- As a user, I want to share saved content.
- As a contact, I want to view and comment on shared items.
- As an admin, I want to manage users and audit usage.

### 3.2 Use Cases

- Guest/user/admin browse homepage
- Registration/login/password reset
- Submit content, tag, comment
- Share with contacts and manage groups
- Search/sort saved content
- Admin dashboard and audit log

---

## 4. Ethical and Cultural Impact

- **Equity**: Accessible across cultures/devices  
- **Expression**: Multi-language support for tags/comments  
- **Partnership**: Inclusive feedback loops  
- **Protection**: Strong encryption, data in transit/rest  
- **IP Respect**: No media download or content copying  
- **Safe AI**: Avoid addiction, monitor AI for bias  

---

## 5. SDLC - Software Development Life Cycle

- **Methodology**: Scrum + DevOps
- **Tools**: Trello, Docker, GitHub Actions
- **Sprints**: Weekly, with feedback and CI/CD goals

---

## 6. Project Timeline

| Weeks     | Tasks                                                         |
|-----------|---------------------------------------------------------------|
| 22–23     | Research, requirements, user stories, schema, PM setup        |
| 24–26     | Frontend layout, OAuth/email auth, session handling           |
| 27–29     | Content submission, tagging, dashboard                        |
| 30–31     | Contacts system, sharing features                             |
| 32        | Admin features, testing, documentation                        |
| 33        | Polish, improve, UI/UX refinements                            |
| 34        | Final deployment, reporting, peer review                      |
| 35        | Project ends                                                  |

---

## 7. Diagrams

- **Problem Domain Sketch**
- **Use Case Diagrams** by feature domain
- **ERD** for normalized schema

All diagrams are maintained in [/docs/diagrams/out/](docs/diagrams/out/)

---

## 8. References

- [daysave_user_stories.md](docs/md/daysave_user_stories.md)
- [tech_tools_accounts.md](docs/md/tech_tools_accounts.md)
- [daysave_references.md](docs/md/daysave_references.md)

Additional Sources:
- Future Skills Academy. (2025). *Software Development Workbook*.  
- GeeksforGeeks. *Iterative and Incremental Development (IID)*.  
- University of Otago. *Academic Integrity and Plagiarism*.  

---

_This proposal is current as of 24/05/2025 and covers version 1.0.1 of the DaySave.app project._

