Content Endpoints
Method	Endpoint	Description
GET	/api/v1/s/content	Get all content (paginated)
GET	/api/v1/s/content/:id	View specific content by ID
POST	/api/v1/s/content	Create new content
PUT	/api/v1/s/content/:id	Update existing content
DELETE	/api/v1/s/content/:id	Delete content by ID
GET	/api/v1/s/content/search	Filter and search content

GET /api/v1/s/content/search – Supported Query Parameters
Param	Type	Description
q	string	Fulltext search (in title and body)
title	string	Filter by content title (partial match)
tags	string	Comma-separated list of tags
channel	string	Source/channel (e.g., YouTube, Instagram)
type	string	Content type (video, article, etc.)
category	string	Content category (e.g., Health, Education)
created_from	date	Only content created after this date
created_to	date	Only content created before this date
lat	float	Latitude for geolocation filter
long	float	Longitude for geolocation filter
radius	float	Radius in km (default: 10km if lat/long present)
limit	integer	Max results to return (default: 20)
offset	integer	Pagination offset
sort	string	Field to sort by (e.g., created_at)
order	string	asc or desc (default: desc)

Contact Endpoints
Method	Endpoint	Description
GET	/api/v1/s/contact	Get all contacts (paginated)
GET	/api/v1/s/contact/:id	View contact by ID
POST	/api/v1/s/contact	Create new contact
PUT	/api/v1/s/contact/:id	Update existing contact
DELETE	/api/v1/s/contact/:id	Delete contact by ID
GET	/api/v1/s/contact/search	Search/filter contacts

GET /api/v1/s/contact/search – Supported Query Parameters
Param	Type	Description
q	string	Fulltext search (name, email, phone)
name	string	Filter by contact name
email	string	Filter by contact email
phone	string	Filter by phone number
group_id	string	Filter by group
created_from	date	Created after this date
created_to	date	Created before this date
limit	integer	Max results to return (default: 20)
offset	integer	Pagination offset
sort	string	Field to sort by (e.g., name, created_at)
order	string	asc or desc (default: desc)

Optional Additions
Secure encrypted equivalents:

POST /api/v1/s/content/search/secure

POST /api/v1/s/contact/search/secure

ulk versions:

POST /api/v1/s/content/bulk (create/update multiple)

DELETE /api/v1/s/contact/bulk (delete multiple)