# DaySave API: Contact Endpoints

## GET /api/v1/s/contact/search

Search and filter contact entries.

| Param         | Type    | Description                                   |
|---------------|---------|-----------------------------------------------|
| `q`           | string  | Fulltext search (name, email, phone)          |
| `name`        | string  | Filter by contact name                        |
| `email`       | string  | Filter by contact email                       |
| `phone`       | string  | Filter by phone number                        |
| `address`     | string  | Filter by address (street, city, state, zip)  |
| `country`     | string  | Filter by address (country)      |
| `group_id`    | string  | Filter by group                               |
| `created_from`| date    | Created after this date                       |
| `created_to`  | date    | Created before this date                      |
| `limit`       | integer | Max results to return (default: 20)           |
| `offset`      | integer | Pagination offset                             |
| `sort`        | string  | Field to sort by (e.g., `name`, `created_at`) |
| `order`       | string  | `asc` or `desc` (default: `desc`)             |

## POST /api/v1/s/contact/search/secure

Same functionality as above, but encrypted using hybrid RSA + AES-GCM payloads.

## CRUD Endpoints

| Method | Endpoint                   | Description               |
|--------|----------------------------|---------------------------|
| GET    | `/api/v1/s/contact`        | Get all contacts          |
| GET    | `/api/v1/s/contact/:id`    | Get a specific contact    |
| POST   | `/api/v1/s/contact`        | Create new contact        |
| PUT    | `/api/v1/s/contact/:id`    | Update contact by ID      |
| DELETE | `/api/v1/s/contact/:id`    | Delete contact by ID      |

## Bulk Operations (

| Method | Endpoint                   | Description                         |
|--------|----------------------------|-------------------------------------|
| POST   | `/api/v1/s/contact/bulk`   | Create or update multiple contacts  |
| DELETE | `/api/v1/s/contact/bulk`   | Delete multiple contacts            |
