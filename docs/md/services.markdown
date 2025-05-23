# Daysave Services

This document lists the services provided by the Daysave app, including their features, implementation status, and role-specific access considerations.

## Services

| Service              | Features                                                                 | Status         | Role Access                     |
|----------------------|--------------------------------------------------------------------------|----------------|---------------------------------|
| **Content Management**| Create, read, update, delete (CRUD) content (e.g., notes)               | In Progress    | All users                       |
| **Contact Management**| CRUD contacts, group contacts (e.g., Friends, Family)                   | In Progress    | All users                       |
| **Subscription Management** | Manage subscriptions with start/end dates                         | Not Implemented| All users                       |
| **Authentication**   | Local authentication (username/password), OAuth (Google, GitHub), SSO (Okta, Azure AD), passkeys (WebAuthn), 2FA (TOTP, SMS) | Not Implemented (Placeholder Middleware) | All users |
| **Security**         | Device fingerprinting, role-based access control (roles: `admin` with full access, `user` with limited access) | Not Implemented | Admin for role management, all users for fingerprinting |

## Future Services

| Service              | Features                                                                 | Status         |
|----------------------|--------------------------------------------------------------------------|----------------|
| **Graph View**       | Visualize relationships between content, contacts, and subscriptions    | Not Implemented|
| **AI Features**      | Content generation, summarization, and automation                       | Not Implemented|