# Daysave User Stories

This document lists user stories for the Daysave app to guide development and ensure the app meets user needs.

## User Stories

| Role   | Goal                                                    | Acceptance Criteria                                                                 | Priority | Status      |
|--------|---------------------------------------------------------|-------------------------------------------------------------------------------------|----------|-------------|
| User   | Log in with my Google account to avoid creating a new password | - Click "Login with Google" button<br>- Redirect to Google for authentication<br>- Log in to Daysave on success | High     | Not Started |
| User   | Manage my content (notes) to track my ideas             | - Create, read, update, delete notes<br>- Notes associated with user’s account      | High     | In Progress |
| User   | Manage my contacts to organize my relationships         | - Create, read, update, delete contacts<br>- Group contacts (e.g., Friends, Family) | Medium   | In Progress |
| User   | Manage my subscriptions to track my services            | - Add subscriptions with start/end dates<br>- View active subscriptions<br>- Delete subscriptions | Medium   | Not Started |
| Admin  | Assign roles to users to control access to features     | - Assign roles (e.g., user, admin)<br>- Roles determine access (e.g., admin manages all content) | Medium   | Not Started |
| User   | Use device fingerprinting to enhance security           | - System collects device fingerprint<br>- Flags suspicious activity (e.g., new device) | High     | Not Started |
| User   | Enable MFA to secure my account                         | - Enable MFA (e.g., TOTP, SMS)<br>- Require MFA on login if enabled                | High     | Not Started |