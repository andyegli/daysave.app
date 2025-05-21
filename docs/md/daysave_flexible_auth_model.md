can you provide a schema where a user_profile can register and authenticate using the following auth_methodes: multiple (username and password), multiple oauth, sso and / or passkeys and offer the user_profile can select a combination for multi factor authentication  via OTP, pass_code_list, email, sms or a auth_method above

✅ Summary
The schema supports multiple authentication methods per user

Enables flexible MFA with user preferences and enforcement

Separate tables for each auth method help with scalability and auditing

Secure design with support for TOTP, email, SMS, passkey-based MFA


✅ Supported Authentication Methods

1. Primary Authentication

username + password

OAuth (Google, Apple, Microsoft, etc.)

SSO (via SAML or OIDC)

Passkey / WebAuthn

2. Multi-Factor Authentication (MFA)
OTP (TOTP via Authenticator app)

Email verification code

SMS code

Printed Passcode list (HOTP style)

Any of the above primary methods as a secondary factor

🗂️ DATABASE SCHEMA
💡 Design Goals:
Decouple methods from user_profile to allow flexible combinations

Each auth method (e.g., passkey, oauth, etc.) has its own table

MFA methods are configurable and may be mandatory per user/org

Support multiple auth providers per user

Support MFA preference and enforcement

🔑 Tables Overview:

user_profile               -- Basic user info
auth_passwords             -- Stores username + hashed password
auth_oauth_providers       -- External OAuth logins
auth_sso_connections       -- SSO records (e.g., SAML, OIDC)
auth_passkeys              -- WebAuthn credentials
auth_mfa_methods           -- Registered MFA methods (per user)
auth_mfa_passcode_lists    -- For static passcode lists
auth_mfa_totp              -- For app-based TOTP (e.g., Google Auth)
auth_mfa_email             -- Email codes (transient)
auth_mfa_sms               -- SMS codes (transient)

📋 Full SQL Schema
 
CREATE TABLE user_profile (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  preferred_mfa_method VARCHAR(50) DEFAULT NULL
);

CREATE TABLE auth_passwords (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_oauth_providers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  provider_name VARCHAR(50),       -- e.g., "google", "apple"
  provider_user_id VARCHAR(255),   -- e.g., Google sub
  access_token TEXT,
  refresh_token TEXT,
  token_expiry TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_sso_connections (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  sso_provider VARCHAR(100),
  sso_subject_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_passkeys (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  credential_id BYTEA UNIQUE NOT NULL,
  public_key BYTEA NOT NULL,
  sign_count INTEGER DEFAULT 0,
  transports TEXT[],
  user_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used TIMESTAMP
);

CREATE TABLE auth_mfa_methods (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  method_type VARCHAR(50),        -- "totp", "email", "sms", "passcode_list", "passkey"
  is_enabled BOOLEAN DEFAULT TRUE,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_mfa_passcode_lists (
  id UUID PRIMARY KEY,
  mfa_method_id UUID REFERENCES auth_mfa_methods(id) ON DELETE CASCADE,
  code VARCHAR(10),
  is_used BOOLEAN DEFAULT FALSE
);

CREATE TABLE auth_mfa_totp (
  id UUID PRIMARY KEY,
  mfa_method_id UUID REFERENCES auth_mfa_methods(id) ON DELETE CASCADE,
  secret VARCHAR(64),            -- Base32 TOTP secret
  confirmed BOOLEAN DEFAULT FALSE
);

CREATE TABLE auth_mfa_email (
  id UUID PRIMARY KEY,
  mfa_method_id UUID REFERENCES auth_mfa_methods(id) ON DELETE CASCADE,
  code VARCHAR(8),
  sent_to VARCHAR(255),
  expires_at TIMESTAMP
);

CREATE TABLE auth_mfa_sms (
  id UUID PRIMARY KEY,
  mfa_method_id UUID REFERENCES auth_mfa_methods(id) ON DELETE CASCADE,
  code VARCHAR(8),
  sent_to VARCHAR(20),
  expires_at TIMESTAMP
);

🌐 PlantUML Entity Relationship Diagram (.puml)
 
@startuml daysave flex auth erd
entity "user_profile" {
  *id : UUID <<PK>>
  email : VARCHAR
  display_name : VARCHAR
  preferred_mfa_method : VARCHAR
  created_at : TIMESTAMP
}

entity "auth_passwords" {
  *id : UUID <<PK>>
  user_id : UUID <<FK>>
  username : VARCHAR
  password_hash : VARCHAR
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
}

entity "auth_sso_connections" {
  *id : UUID <<PK>>
  user_id : UUID <<FK>>
  sso_provider : VARCHAR
  sso_subject_id : VARCHAR
  metadata : JSONB
}

entity "auth_passkeys" {
  *id : UUID <<PK>>
  user_id : UUID <<FK>>
  credential_id : BYTEA
  public_key : BYTEA
  sign_count : INTEGER
  transports : TEXT[]
  user_verified : BOOLEAN
  created_at : TIMESTAMP
  last_used : TIMESTAMP
}

entity "auth_mfa_methods" {
  *id : UUID <<PK>>
  user_id : UUID <<FK>>
  method_type : VARCHAR
  is_enabled : BOOLEAN
  is_primary : BOOLEAN
  created_at : TIMESTAMP
}

entity "auth_mfa_passcode_lists" {
  *id : UUID <<PK>>
  mfa_method_id : UUID <<FK>>
  code : VARCHAR
  is_used : BOOLEAN
}

entity "auth_mfa_totp" {
  *id : UUID <<PK>>
  mfa_method_id : UUID <<FK>>
  secret : VARCHAR
  confirmed : BOOLEAN
}

entity "auth_mfa_email" {
  *id : UUID <<PK>>
  mfa_method_id : UUID <<FK>>
  code : VARCHAR
  sent_to : VARCHAR
  expires_at : TIMESTAMP
}

entity "auth_mfa_sms" {
  *id : UUID <<PK>>
  mfa_method_id : UUID <<FK>>
  code : VARCHAR
  sent_to : VARCHAR
  expires_at : TIMESTAMP
}

user_profile ||--o{ auth_passwords
user_profile ||--o{ auth_oauth_providers
user_profile ||--o{ auth_sso_connections
user_profile ||--o{ auth_passkeys
user_profile ||--o{ auth_mfa_methods

auth_mfa_methods ||--o{ auth_mfa_passcode_lists
auth_mfa_methods ||--|| auth_mfa_totp
auth_mfa_methods ||--|| auth_mfa_email
auth_mfa_methods ||--|| auth_mfa_sms
@enduml

