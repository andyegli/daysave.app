How Username + Password Authentication Works
🔧 Registration
User enters username/email + password

Password is hashed (e.g., using bcrypt)

Hash is stored in the database

🔐 Login
User enters credentials

App finds user by username or email

App hashes submitted password and compares it to stored hash

On match → user authenticated → issue session or token

✅ Part 2: SQL Schema
We split the profile and the credentials for security and flexibility.

sql:

-- Main user profile
CREATE TABLE user_profile (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE
);

-- Authentication credentials (username/password hash)
CREATE TABLE auth_passwords (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profile(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  failed_attempts INT DEFAULT 0,
  is_locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🧭 Part 3: Entity-Relationship Diagram (.puml)
This version includes user_profile and auth_passwords as separate but connected entities.

puml:

@startuml daysave_UNPW_erd
entity "user_profile" {
  *id : UUID <<PK>>
  email : VARCHAR
  display_name : VARCHAR
  avatar_url : TEXT
  created_at : TIMESTAMP
  last_login : TIMESTAMP
  is_verified : BOOLEAN
}

entity "auth_passwords" {
  *id : UUID <<PK>>
  user_id : UUID <<FK>>
  username : VARCHAR <<UNIQUE>>
  password_hash : VARCHAR
  failed_attempts : INT
  is_locked : BOOLEAN
  created_at : TIMESTAMP
}

user_profile ||--|| auth_passwords : uses
@enduml

Sequence Diagram for Username/Password Auth (.puml)
puml:

@startuml daysave_UNPW_seq
actor User
participant "Frontend\nBrowser" as Frontend
participant "Backend API" as Backend
participant "Database" as DB

== Registration ==
User -> Frontend : Enters email, username, password
Frontend -> Backend : POST /register
Backend -> Backend : Hash password (e.g., bcrypt)
Backend -> DB : INSERT INTO user_profile
Backend -> DB : INSERT INTO auth_passwords
Backend -> Frontend : Return success

== Login ==
User -> Frontend : Enters username + password
Frontend -> Backend : POST /login
Backend -> DB : SELECT user_profile + password_hash by username
Backend -> Backend : Compare hashed password
alt Match
    Backend -> DB : UPDATE last_login
    Backend -> Frontend : Success + Issue session/token
else No match
    Backend -> DB : Increment failed_attempts
    Backend -> Frontend : Show login error
end
@enduml

🛡️ Best Practice Checklist
Practice	Why it matters
Use bcrypt or argon2	Secure hashing, slow against brute force
Store only password hashes	Never store plaintext
Separate credentials from profile	Modular and secure
Track failed attempts	Prevent brute-force attacks
Add MFA later	Easy to extend this model
Use UUIDs for IDs	Safer than auto-increment IDs

✅ Summary
user_profile handles user metadata

auth_passwords handles credentials

Passwords are stored as bcrypt hashes

Both registration and login flows are supported and diagrammed

