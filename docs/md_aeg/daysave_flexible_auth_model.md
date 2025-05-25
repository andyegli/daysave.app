can you provide a schema where a user_profile can register and authenticate using multiple supported passport authentication strategies. Also offer the user_profile the option to select one ore a combination for multi factor authentication  via WebAuth, OTP, pass_code_list, email, sms, magic link

***Summary***
The schema supports multiple authentication methods per user

Enables flexible MFA choice with user preferences and the option of administrative enforcement

addreeses the need for comprehensive auditing

Secure design with all payload beeing encrypted using asynchronus public keys 


**Supported Authentication Methods*

**1. Primary Authentication**

- username + password

- OAuth (Google, Apple, Microsoft, etc.)

- SSO (via SAML or OIDC)

- Passkey / WebAuthn

**2. Multi-Factor Authentication (MFA)*

- OTP (TOTP via Authenticator app)

- Email verification code

- SMS code

- Magic Link

- WebAuth Passkey

- Printed Passcode list (HOTP style)


**DATABASE SCHEMA*8

Design Goals:

- Decouple methods from user_profile to allow flexible combinations

- MFA methods are configurable and may be mandatory per user/org

- Support multiple auth providers per user

- Support MFA preference and enforcement


