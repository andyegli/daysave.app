# DaySave API: Content Endpoints

## GET /api/v1/s/content/search

Search and filter content items using various criteria.

| Param         | Type    | Description                                      |
|---------------|---------|--------------------------------------------------|
| `q`           | string  | Fulltext search (in title and body)              |
| `title`       | string  | Filter by content title (partial match)          |
| `tags`        | string  | Comma-separated list of tags                     |
| `channel`     | string  | Source/channel (e.g., YouTube, Instagram)        |
| `type`        | string  | Content type (video, article, photo)             |
| `category`    | string  | Content category (e.g., Health, Education)       |
| `created_from`| date    | Only content created after this date             |
| `created_to`  | date    | Only content created before this date            |
| `lat`         | float   | Latitude for geolocation filter                  |
| `long`        | float   | Longitude for geolocation filter                 |
| `radius`      | float   | Radius in km (default: 10km if lat/long present) |
| `limit`       | integer | Max results to return (default: 20)              |
| `offset`      | integer | Pagination offset                                |
| `sort`        | string  | Field to sort by (e.g., `created_at`)            |
| `order`       | string  | `asc` or `desc` (default: `desc`)                |

## POST /api/v1/s/content/search/secure

Same functionality as above, but encrypted using hybrid RSA + AES-GCM payloads.

##  CRUD Endpoints

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| GET    | `/api/v1/s/content`       | Get all content items      |
| GET    | `/api/v1/s/content/:id`   | Get a single content item  |
| POST   | `/api/v1/s/content`       | Create new content         |
| PUT    | `/api/v1/s/content/:id`   | Update content by ID       |
| DELETE | `/api/v1/s/content/:id`   | Delete content by ID       |

## Bulk Operations 

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| POST   | `/api/v1/s/content/bulk`    | Create or update multiple entries  |
| DELETE | `/api/v1/s/content/bulk`    | Delete multiple content entries    |
