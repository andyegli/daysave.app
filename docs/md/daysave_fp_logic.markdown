# Daysave Fingerprint Logic

Daysave uses device fingerprinting as part of its security model to identify and track user devices. This document outlines the fingerprinting logic and its implementation.

## Overview

Device fingerprinting collects unique characteristics of a user’s device to create a fingerprint, which is stored in the database and used for security purposes (e.g., detecting suspicious activity).

## Database Schema

### `fingerprints`
Stores device fingerprint data.

| Field            | Type     | Constraints               | Description         |
|------------------|----------|---------------------------|---------------------|
| `id`             | UUID     | Primary Key, Default: UUIDV4 | Unique fingerprint ID |
| `user_profile_id`| UUID     | Not Null, Foreign Key (`user_profiles.userId`) | Associated user |
| `fingerprint_data`| JSON    | Nullable                  | Fingerprint data   |
| `createdAt`      | DateTime | Not Null, Default: Now    | Creation timestamp |
| `updatedAt`      | DateTime | Not Null, Default: Now    | Update timestamp   |

## Fingerprint Data

The `fingerprint_data` field stores a JSON object with attributes such as:

```json
{
  "device": "desktop",
  "browser": "Chrome",
  "os": "Windows",
  "screen_resolution": "1920x1080",
  "timezone": "UTC+0"
}
```

### Collection Methods
- **Planned Implementation**:
  - Use JavaScript APIs like `navigator.userAgent` for browser and OS detection.
  - Use `window.screen` for screen resolution.
  - Use `Intl.DateTimeFormat().resolvedOptions().timeZone` for timezone.
  - Leverage a library like FingerprintJS to collect additional attributes (e.g., canvas fingerprinting, WebGL).

## Implementation

- **Collection**:
  - Fingerprint data is collected on the client side using JavaScript (planned implementation).
- **Storage**:
  - The data is sent to the server and stored in the `fingerprints` table, associated with a user via `user_profile_id`.
- **Usage**:
  - The fingerprint is used to detect changes in device characteristics, which may indicate suspicious activity (planned implementation).

## Privacy Considerations

- **User Consent**: Ensure users are informed about fingerprinting and provide consent, aligning with privacy regulations like GDPR.
- **Data Minimization**: Collect only the necessary attributes to minimize privacy impact.
- **Transparency**: Document fingerprinting practices in the app’s privacy policy.

## Future Enhancements

- **Client-Side Fingerprinting**:
  - Implement fingerprinting using FingerprintJS to collect a comprehensive device fingerprint.
- **Suspicious Activity Detection**:
  - Add logic to compare fingerprints and flag suspicious activity, such as:
    - Login from a new device in a different country.
    - Significant changes in browser or OS within a short time.
- **Authentication Integration**:
  - Require additional verification (e.g., MFA) if the fingerprint changes significantly.