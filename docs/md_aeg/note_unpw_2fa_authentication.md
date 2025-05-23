Username and Password Authentication with Optional 2FA

Design of a Secure Authentication System with Multi-Factor Support

This design outlines a username/password authentication system with optional 
two-factor authentication (2FA) methods. It emphasizes separation of user profile 
and credential data, robust tracking of login attempts, and support for 
multiple 2FA methods per user (TOTP, SMS, email, and backup codes). 
Security best practices – such as hashed passwords, unique salts, account lockout, 
and secure handling of 2FA secrets/codes – are incorporated.

Database Schema Design
The database is organized into distinct tables to isolate sensitive information and support the various 2FA options:

Users – Contains user profile data (e.g. username, email, etc.) separate from credentials. 
Keeping identity-critical data (like passwords) in a different table helps avoid accidental exposure through normal profile queries

The Users table includes a unique ID:GUID (primary key) and fields like username and email (unique).

Credentials – Stores authentication secrets and login attempt info for each user (one-to-one with Users). 
It has a foreign key to Users and fields for the password hash (securely hashed with a unique salt
, the salt value (if not using an algorithm that stores it internally), 
and counters/timestamps for tracking login attempts. 

For example, failed_attempts and last_failed_at track consecutive failed logins, and locked_until can temporarily lock the account after too many failures

A last_login_at field can record the last successful login time.

User_MFA_Methods – 
A table listing 2FA methods enabled per user (one-to-many relationship from Users).
Each record indicates a method (e.g. 'TOTP', 'SMS', 'EMAIL') the user has enabled, along with the data needed for that method. For TOTP, this table stores the secret key (e.g. base32 string);

for SMS, it stores the phone number; 

for email, it can simply mark that the primary email is used for 2FA. Storing the TOTP secret in retrievable form is necessary (it cannot be hashed, since the server must generate/verifying OTP codes from it, it should be stored securely (e.g. encrypted at rest). 

Each method entry has a unique combination of (user_id, method_type) so users can enable any mix of methods. An enabled flag allows temporarily disabling a method without deleting it (optional).

Backup_Codes – 
Stores a number one-time backup/recovery codes for each user who has MFA.
Providing a set of single-use backup codes at MFA setup is recommended to prevent lockout if other factors are unavailable

Each code is stored as a salted hash (treating these codes like secondary passwords since a backup code can fully authenticate second-factor if the primary device is lost. This table includes a flag to mark codes as used so they cannot be reused. 
Users may have multiple backup codes (e.g. a list of 5–10); each is a separate row linked to the user.

Auth_Codes – 
A transient table for verification codes sent via SMS or email during login. When a user with SMS or email 2FA logs in, the system generates a random one-time code and sends it out. The code (or a hash of it) is stored here with an expiration timestamp. This table tracks the code’s validity window and whether it’s been used, supporting verification on code entry. Each record links to the user and notes the method (e.g. 'SMS' or 'EMAIL'). Entries should expire and be purged or invalidated after use. (Alternatively, this can be considered a log of recent 2FA challenges.)
Login_Attempt_Log (optional) – For audit and monitoring, an additional log table could record each login attempt (timestamp, user, 
success/failure, source IP, etc.). This is separate from the Credentials counters and can help in detecting brute-force or suspicious activities. All account lockouts/alerts should be logged and reviewed

.
Below is the SQL schema implementing the above design. It uses an integer primary key for user identity, and appropriate foreign keys for relationships. Passwords are hashed (e.g. using a strong algorithm like Argon2 or bcrypt) with unique salts
stackoverflow.com
, and backup codes and auth codes are stored as hashes as well for security. (Data types and constraints can be adjusted per the SQL dialect – here we use a generic style with VARCHAR for simplicity, and a BOOLEAN type for flags.)
sql
Copy
Edit
CREATE TABLE Users (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(255) NOT NULL UNIQUE,
    -- additional profile fields (name, etc.) can go here
    created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Credentials (
    user_id         INT        PRIMARY KEY,            -- one-to-one with Users
    password_hash   VARBINARY(255) NOT NULL,           -- hashed password (with salt)
    salt            VARBINARY(255) NOT NULL,           -- unique salt for hashing
    failed_attempts INT        NOT NULL DEFAULT 0,     -- count of consecutive failed logins
    last_failed_at  DATETIME,                         -- timestamp of last failed attempt
    locked_until    DATETIME,                         -- account locked until this time if too many failures
    last_login_at   DATETIME,                         -- last successful login timestamp
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE User_MFA_Methods (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    user_id      INT        NOT NULL,
    method_type  VARCHAR(10) NOT NULL,    -- e.g. 'TOTP', 'SMS', 'EMAIL'
    secret       VARBINARY(255),         -- TOTP secret (if method_type='TOTP')
    phone        VARCHAR(20),            -- phone number (if method_type='SMS')
    email        VARCHAR(255),           -- email address (if method_type='EMAIL'; could default to Users.email)
    enabled      BOOLEAN    NOT NULL DEFAULT TRUE,
    created_at   DATETIME   DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    UNIQUE (user_id, method_type)        -- each method enabled at most once per user
);

CREATE TABLE Backup_Codes (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    user_id    INT       NOT NULL,
    code_hash  VARBINARY(255) NOT NULL,   -- hashed one-time backup code
    is_used    BOOLEAN   NOT NULL DEFAULT FALSE,
    created_at DATETIME  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Auth_Codes (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT       NOT NULL,
    method      VARCHAR(10) NOT NULL,    -- 'SMS' or 'EMAIL'
    code_hash   VARBINARY(255) NOT NULL, -- hashed verification code 
    expires_at  DATETIME  NOT NULL,      -- expiry timestamp for the code
    used        BOOLEAN   NOT NULL DEFAULT FALSE,
    created_at  DATETIME  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
Notes on security and usage: The Credentials table is kept separate from Users to reduce exposure of sensitive data via routine profile queries
security.stackexchange.com
. Only the authentication subsystem should access Credentials. The password hash is stored instead of plaintext, using a strong one-way hashing scheme with a unique salt per user (and optionally a pepper)
stackoverflow.com
. The system should enforce a lockout policy by updating failed_attempts and locked_until – for example, lock the account for a few minutes after a certain number of failures
cheatsheetseries.owasp.org
, to throttle brute-force attempts. The User_MFA_Methods table allows any combination of 2FA methods: for instance, a user might have a TOTP app, SMS, and backup codes all enabled simultaneously
cheatsheetseries.owasp.org
. The TOTP secret is stored in a retrievable format (plaintext or encrypted) because it must be used to generate and verify OTPs
stackoverflow.com
. SMS and email factors use the contact info to send one-time Auth_Codes, which are short-lived (e.g. 5-minute expiry). Backup codes are generated when the user enables MFA and stored hashed; treating them like passwords (sufficiently long/random and stored securely) prevents attackers from using them if the database is compromised
stackoverflow.com
. Each backup code is marked used upon usage so it cannot be used again. All these design choices align with MFA best practices: offering multiple forms of second factor and recovery options while keeping secrets secure
cheatsheetseries.owasp.org
.
Entity-Relationship Diagram (ERD)
The following PlantUML ER diagram shows the tables and relationships described above. A crow’s foot notation is used to indicate cardinalities: one user has one credentials record, and may have multiple MFA method entries, backup codes, and auth codes. (Each of those entries is linked to exactly one user.)
plantuml
Copy
Edit
@startuml
entity "Users" as U {
  * id : int <<PK>>
  --
  username : varchar(50)
  email : varchar(255)
  created_at : datetime
}
entity "Credentials" as C {
  * user_id : int <<PK, FK>>  -- FK to Users(id)
  --
  password_hash : varbinary
  salt : varbinary
  failed_attempts : int
  last_failed_at : datetime
  locked_until : datetime
  last_login_at : datetime
}
entity "User_MFA_Methods" as M {
  * id : int <<PK>>
  --
  user_id : int <<FK>>       -- FK to Users(id)
  method_type : varchar(10)
  secret : varbinary
  phone : varchar(20)
  email : varchar(255)
  enabled : boolean
  created_at : datetime
}
entity "Backup_Codes" as B {
  * id : int <<PK>>
  --
  user_id : int <<FK>>       -- FK to Users(id)
  code_hash : varbinary
  is_used : boolean
  created_at : datetime
}
entity "Auth_Codes" as A {
  * id : int <<PK>>
  --
  user_id : int <<FK>>       -- FK to Users(id)
  method : varchar(10)
  code_hash : varbinary
  expires_at : datetime
  used : boolean
  created_at : datetime
}
' Relationships
U ||--|| C : hasCredentials >
U ||--o{ M : hasMFA >
U ||--o{ B : hasBackupCodes >
U ||--o{ A : hasAuthCodes >
@enduml
Explanation: Each User (U) has exactly one associated Credentials (C) row (one-to-one, indicated by the ||--|| line). A user can have zero or many MFA method (M) entries (||--o{), zero or many Backup_Codes (B), and zero or many Auth_Codes (A) records. The crow’s foot on the right side of those relationships denotes the "many" side. For example, a user may have multiple backup codes and multiple auth codes (one for each login attempt that required a code), or none at all if 2FA is not enabled. The foreign key relationships ensure referential integrity (each MFA, code, or credential entry must link to a valid user).
Authentication Flow Sequence Diagram
The sequence diagram below (in PlantUML syntax) illustrates the registration process and the login flow with optional 2FA, including how the system handles multiple 2FA methods and fallback if one method fails. It shows interactions between the User, the Auth system (application/backend), the database, and external services for SMS/Email delivery.
plantuml
Copy
Edit
@startuml
actor User
participant "Auth System" as Auth
database "Database" as DB
participant "SMS Service" as SMS
participant "Email Service" as Email

== Registration ==
User -> Auth: Submit registration (username, password, etc.)
Auth -> DB: Insert new user record into Users
Auth -> DB: Store hashed password & salt in Credentials:contentReference[oaicite:16]{index=16}
opt User enables TOTP during sign-up
    Auth -> Auth: Generate TOTP secret for user
    Auth -> DB: Save TOTP secret in User_MFA_Methods:contentReference[oaicite:17]{index=17}
    Auth -> User: Display QR code for authenticator app (TOTP secret)
end opt
opt User enables SMS 2FA
    User -> Auth: Provide phone number for 2FA
    Auth -> DB: Save phone number in User_MFA_Methods
    Auth -> SMS: Send verification code via SMS to phone
    SMS -> User: SMS with verification code
    User -> Auth: Enter SMS code to confirm phone
    Auth -> DB: Mark phone as verified for 2FA
end opt
opt User enables Email 2FA
    Auth -> DB: Add email method in User_MFA_Methods (using user's email)
    ... (Email is typically verified from registration)
end opt
opt User generates backup codes:contentReference[oaicite:18]{index=18}
    Auth -> DB: Generate multiple one-time backup codes (store hashes):contentReference[oaicite:19]{index=19}
    Auth -> User: Show backup codes to save (for 2FA recovery):contentReference[oaicite:20]{index=20}
end opt

== Login ==
User -> Auth: Enter username & password (login request)
Auth -> DB: Retrieve user by username
Auth -> DB: Verify password hash matches (credentials check)
alt Password valid
    Auth -> DB: Reset failed_attempts, update last_login_at
    alt 2FA is enabled for this user
        Auth -> User: Prompt for 2FA code (TOTP, SMS, email or backup)
        alt User uses TOTP (authenticator app)
            User -> Auth: Enter 6-digit TOTP code
            Auth -> DB: Retrieve TOTP secret for user
            Auth -> Auth: Validate TOTP code using the secret
        else User uses SMS code
            Auth -> SMS: Send one-time code via SMS
            SMS -> User: SMS with verification code
            User -> Auth: Enter SMS code from phone
            Auth -> DB: Verify the code against Auth_Codes (check value & expiry)
        else User uses Email code
            Auth -> Email: Send one-time code via email
            Email -> User: Email with verification code
            User -> Auth: Enter email code from inbox
            Auth -> DB: Verify the code against Auth_Codes (check value & expiry)
        else User uses backup code
            User -> Auth: Enter one of the backup codes
            Auth -> DB: Verify the code by comparing hash in Backup_Codes
        end alt
        alt Second factor success
            Auth -> DB: If backup code used, mark it as used
            Auth -> User: Login successful (access granted)
        else Second factor failure
            Auth -> User: 2FA verification failed – prompt for another method:contentReference[oaicite:21]{index=21}
            ... (User can retry or choose a different 2FA method as fallback)
        end alt
    else No 2FA enabled for user
        Auth -> User: Login successful (access granted)
    end alt
else Password invalid
    Auth -> DB: Increment failed_attempts count:contentReference[oaicite:22]{index=22}
    Auth -> User: Login failed (invalid credentials)
end alt
@enduml
Flow explanation:
Registration: The user signs up by providing a username, password, and other details. The Auth system creates a new user in the Users table and saves the password hash (with salt) in the Credentials table. If the user opts to enable 2FA methods during registration, the flow goes through the opt blocks:
For TOTP: the system generates a secret key for the user and stores it (in the User_MFA_Methods table with method 'TOTP'). It then presents a QR code or setup code for the user to scan into their authenticator app.
For SMS 2FA: the user provides a phone number. The system saves it (as an 'SMS' method in User_MFA_Methods), then sends a verification code via the SMS service to confirm the number. The user enters the received code, and on success the phone is marked verified (so it can be used for future logins).
For Email 2FA: since the email is already collected (and typically verified through an activation link), enabling this just records that the user’s email will be used for 2FA codes. (If the email wasn’t verified yet, a similar code flow would be used for confirmation.)
For Backup Codes: the system generates a set of random one-time recovery codes for the user
cheatsheetseries.owasp.org
. It stores their hashes in Backup_Codes and displays the codes to the user once to be saved (the codes are not shown again, for security). These codes serve as a fallback login factor if the user loses access to their primary 2FA device, as recommended by OWASP
cheatsheetseries.owasp.org
.
Login (password step): The user enters credentials to log in. The Auth system fetches the user’s record and compares the provided password (after hashing it) to the stored hash.
If the password is incorrect, the system returns a generic error and increments the failed attempt counter in the Credentials record
cheatsheetseries.owasp.org
. After too many failures, the locked_until could be set, refusing further attempts for a period (not explicitly shown in the diagram, but part of the logic). The error message is generic (not revealing whether password or username was wrong, or if account is locked) to avoid information leakage
cheatsheetseries.owasp.org
cheatsheetseries.owasp.org
.
If the password is correct, the system resets the failed_attempts counter and proceeds. It then checks if the user has any 2FA methods enabled.
Login (2FA step): If the user has 2FA enabled, the Auth system prompts for a second factor. At this point, the user can use any of the configured methods to authenticate:
TOTP: The user opens their authenticator app (something they have) and enters the current one-time code. The server retrieves the stored TOTP secret for the user and verifies the code is correct for the current time-step. If it matches, 2FA is successful.
SMS: The system triggers an SMS to the user’s phone with a new one-time code (often 6–8 digits) via the SMS service. The user enters that code on the website. The server looks up the latest valid code in the Auth_Codes table for that user and method, checks that the code matches and isn’t expired or already used, then marks it used.
Email: Similarly, the system sends a one-time code to the user’s email. The user retrieves it and enters it, and the code is verified against the Auth_Codes table.
Backup Code: The user provides one of their previously saved backup codes. The server hashes the provided code and checks it against the hashed codes in Backup_Codes. If a match is found and the code is not already used, it’s valid. The server then marks that backup code record as used (so it cannot be reused).
The sequence diagram uses an alt block to show these alternative 2FA paths. In practice, the user interface might default to one method (e.g. prompt for TOTP code) but allow switching to another method (like “Text me a code” or “Use backup code”) if needed. The design supports any configured method as a second factor.
If the provided 2FA code is verified successfully, the login is completed and the user is granted access. (If a backup code was used, it is invalidated in the database at this point.)
If the 2FA code is incorrect or not available, the system does not immediately reject the login outright. Following security best practices, it should allow the user to try another factor or get a new code
cheatsheetseries.owasp.org
. The diagram’s failure branch shows the server prompting the user to retry or choose an alternate method – for example, if the TOTP code was wrong (or the user doesn’t have their authenticator device), they could opt to receive an SMS or use a backup code instead. This “fallback” mechanism ensures the user isn’t permanently locked out if one factor fails, while still preventing an attacker (who might have stolen the password) from bypassing 2FA easily
cheatsheetseries.owasp.org
cheatsheetseries.owasp.org
. The system may also trigger security notifications in this case (e.g. email the user that a 2FA attempt failed) to warn of potential account compromise
cheatsheetseries.owasp.org
.
Login (success): If the password and the second factor (if required) are both verified, the user is logged in. The system creates a session for the user and may log the successful authentication event. On the back-end, last_login_at is updated. If this was the first login after a lockout, it can also reset the lockout state.
Throughout these flows, security best practices are applied: passwords and backup codes are never stored or transmitted in plain text (only hashed or as one-time tokens), secrets like TOTP keys are handled carefully, and multiple factors provide defense in depth. By separating profile data from credentials and logging important events, the schema limits exposure of sensitive info and facilitates monitoring. The user benefits from being able to enable multiple 2FA methods (for convenience or backup), knowing that if one method is unavailable (no phone, etc.), another can be used to securely log in
cheatsheetseries.owasp.org
. This comprehensive design thus balances security and usability for authentication. Sources:
OWASP Cheat Sheet – Multifactor Authentication: recommendations on backup codes, using multiple factors, and handling failed 2FA attempts
cheatsheetseries.owasp.org
cheatsheetseries.owasp.org
.
Stack Overflow – Guidance on storing 2FA secrets and codes: TOTP secrets must remain retrievable (not hashed)
stackoverflow.com
; treat one-time backup codes like passwords (strong, hashed, salted)
stackoverflow.com
stackoverflow.com
.
OWASP Cheat Sheet – Authentication: guidance on account lockout policies (thresholds and durations)
cheatsheetseries.owasp.org
 and handling login errors to prevent enumeration
cheatsheetseries.owasp.org
cheatsheetseries.owasp.org
.