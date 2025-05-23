Introduction

OAuth is secure, token-based, and passwordless

Enables "Login with Google/Facebook/Microsoft" experiences

Uses authorization code and access tokens

Tokens should be stored securely, never exposed to frontend

Database should allow multiple OAuth records per user

What is OAuth Authentication?
OAuth 2.0 is a secure authorization framework that allows third-party applications to access a user’s data without requiring their password.

For example:

Instead of creating a new password for "MyApp", users can click "Log in with Google", and MyApp uses OAuth to log them in securely via Google.

How OAuth 2.0 Works (Simplified Flow)
Roles:
Actor	Description
User	The resource owner
Client (your app)	Requests access on behalf of the user
Authorization Server	(e.g. Google, Facebook) verifies user credentials and issues tokens
Resource Server	Stores user's protected resources (sometimes same as auth server)

OAuth Authorization Code Flow
This is the most common flow used for web apps.

Step-by-step:
User clicks “Login with Google”

Client app redirects to Google with a URL including:

client ID

redirect URI

scopes

a random state string

User logs in and approves the scopes (e.g. email, profile)

Google redirects back to the client with an authorization code

Client sends code (plus secret) to Google’s token endpoint

Google responds with:

access token

refresh token (optional)

token expiry

Client uses the access token to fetch user info from Google’s userinfo endpoint

Client logs in or registers the user using the fetched email/profile data

Sequence Diagram (.puml)

@startuml daysave_oauth_seq
actor User
participant "Your Web App\n(Client)" as App
participant "Google OAuth\n(Authorization Server)" as Google
participant "Google API\n(Resource Server)" as GoogleAPI
participant "Your Database" as DB

User -> App : Clicks “Login with Google”
App -> Google : Redirect with Client ID + Scope + State
User -> Google : Logs in + Approves Scopes
Google -> App : Redirect back with Auth Code

App -> Google : Exchange Auth Code for Tokens
Google -> App : Access Token + ID Token + Refresh Token

App -> GoogleAPI : GET /userinfo with Access Token
GoogleAPI -> App : User Profile (name, email, avatar)

App -> DB : Find or Create user by email
App -> User : Logged in
@enduml
🗃️ Database Schema for OAuth Users
This schema supports:

OAuth-based login

Multiple OAuth providers per user

Token management for refresh access


CREATE TABLE user_profile (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_oauth_providers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  provider_name VARCHAR(50) NOT NULL,       -- e.g. 'google', 'facebook'
  provider_user_id VARCHAR(255) NOT NULL,   -- e.g. Google sub ID
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expiry TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (provider_name, provider_user_id)
);

🧭 ERD Diagram (.puml)

@startuml daysave_sso_edr
entity "user_profile" {
  *id : UUID <<PK>>
  email : VARCHAR
  display_name : VARCHAR
  avatar_url : TEXT
  created_at : TIMESTAMP
}

entity "auth_oauth_providers" {
  *id : UUID <<PK>>
  user_id : UUID <<FK>>
  provider_name : VARCHAR
  provider_user_id : VARCHAR
  access_token : TEXT
  refresh_token : TEXT
  token_expiry : TIMESTAMP
  created_at : TIMESTAMP
}

user_profile ||--o{ auth_oauth_providers : "has"
@enduml


