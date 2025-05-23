# Flexible Permission System

Daysave implements a flexible permission system to control access to features and data. This document outlines the design and implementation.

## Overview

The permission system uses roles and permissions to manage access, allowing for fine-grained control over what users can do. Roles are assigned to users, and permissions are associated with roles to determine access rights.

## Database Schema

### `permissions`
Stores permission definitions.

| Field       | Type     | Constraints               | Description         |
|-------------|----------|---------------------------|---------------------|
| `id`        | UUID     | Primary Key, Default: UUIDV4 | Unique permission ID |
| `name`      | String   | Not Null, Unique          | Permission name    |
| `description`| String  | Nullable                  | Permission description |
| `createdAt` | DateTime | Not Null, Default: Now    | Creation timestamp |
| `updatedAt` | DateTime | Not Null, Default: Now    | Update timestamp   |

### `roles`
Stores role definitions.

| Field       | Type     | Constraints               | Description         |
|-------------|----------|---------------------------|---------------------|
| `id`        | UUID     | Primary Key, Default: UUIDV4 | Unique role ID     |
| `name`      | String   | Not Null, Unique          | Role name          |
| `description`| String  | Nullable                  | Role description   |
| `createdAt` | DateTime | Not Null, Default: Now    | Creation timestamp |
| `updatedAt` | DateTime | Not Null, Default: Now    | Update timestamp   |

### `user_roles`
Junction table for users and roles.

| Field            | Type     | Constraints               | Description         |
|------------------|----------|---------------------------|---------------------|
| `id`             | UUID     | Primary Key, Default: UUIDV4 | Unique role assignment ID |
| `user_profile_id`| UUID     | Not Null, Foreign Key (`user_profiles.userId`) | Associated user |
| `role_id`        | UUID     | Not Null, Foreign Key (`roles.id`) | Associated role |
| `createdAt`      | DateTime | Not Null, Default: Now    | Creation timestamp |
| `updatedAt`      | DateTime | Not Null, Default: Now    | Update timestamp   |

## Implementation Details

- **Roles and Permissions**:
  - Define roles (e.g., `admin`, `user`) in the `roles` table.
  - Define permissions (e.g., `manage_content`, `view_contacts`) in the `permissions` table.
- **Assignment**:
  - Assign roles to users via the `user_roles` junction table.
- **Access Control**:
  - Check user roles in middleware (`authMiddleware.js`) to control access to routes (planned implementation).
  - Example: An `admin` role might have `manage_content` permission, allowing access to `/content/delete`.

## Flow Diagram

The access control process can be visualized as follows (using Mermaid in a compatible Markdown renderer):
```
sequenceDiagram
    User->>Express: GET /content/delete
    Express->>AuthMiddleware: Check role
    AuthMiddleware->>Sequelize: Query user_roles
    Sequelize->>MySQL: SELECT role_id
    MySQL-->>Sequelize: Role data
    Sequelize-->>AuthMiddleware: Role
    AuthMiddleware->>Express: Allow/deny access
    Express-->>User: Response
```

## Data-Level Access Control

- **Planned Implementation**:
  - Ensure users can only access their own data (e.g., `content` entries where `userId` matches the logged-in user).
  - Add checks in controllers to filter data based on `userId`.

## Future Enhancements

- **Role-Permission Mapping**:
  - Implement a `role_permissions` table to associate permissions with roles.
- **Dynamic Role Assignment**:
  - Add dynamic role assignment via an admin dashboard.
- **Custom Permissions**:
  - Add support for custom permissions per user (e.g., overriding role-based permissions for specific users).