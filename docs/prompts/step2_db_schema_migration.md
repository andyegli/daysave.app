As an experienced full-stack developer, implement the database schema and migrations for daysave.app v1.0.1, a privacy-focused Node.js web application. Use Sequelize with MySQL, focusing on security, modularity, and future microservices compatibility. The implementation should include:

1. Sequelize models in `src/models/` for all tables in the provided schema (user_profiles, auth_providers, mfa_methods, roles, permissions, fingerprints, contacts, content, etc.), plus:
   - A `content_sources` table (id: UUID, name: ENUM('youtube', 'facebook', 'instagram', 'upload', 'weblink', 'whatsapp', 'linkedin', etc.)).
   - A `content_analysis` table (id: UUID, content_id: UUID, keywords: JSON, summary: TEXT, transcription: TEXT, objects: JSON, created_at: DATETIME) for future AI backend.
2. Migrations in `src/migrations/` to create all tables, using UUID primary keys and encryption for sensitive fields (email, hashed_password, mfa_methods.config).
3. Seed scripts in `scripts/seed.js` to populate:
   - `roles`: guest, trial_member, super_admin.
   - `permissions`: access_admin_page, create_own_content, edit_own_content, share_content, create_contacts.
   - `social_providers`: WhatsApp, WhatsAppBusiness, Teams, Zoom, Threema, LinkedIn, Messenger, Telegram, Discord, Snapchat, Facebook, Threads, Slack, GitHub, Signal, Gmail, Simple, Instagram, TikTok, Revolut.
   - `payment_providers`: PayPal, Stripe, Apple Pay, Google Pay.
   - `content_sources`: youtube, facebook, instagram, upload, weblink, whatsapp, linkedin, etc.
4. Update `src/models/index.js` to export all models and associations (e.g., user_profiles hasMany auth_providers).
5. Ensure:
   - UUID primary keys using `uuid` package.
   - Encryption for sensitive fields using `bcryptjs` or MySQL AES_ENCRYPT.
   - Timestamps and soft deletes (paranoid: true).
   - JSON fields for flexible data (e.g., fingerprints.ip_history, contact phone_numbers).
   - Documentation with JSDoc comments.
   - Version: daysave.app v1.0.1 mentioned in comments.
   - Modular design for future microservices (e.g., separate content and contact models).
   - Support for content types (short, video, text, clip, file) via `content.type` ENUM.
   - Associations for content sharing, tagging, and commenting by users and contacts.

Wrap the entire code in an <xaiArtifact> tag with a unique UUID, title "Database Schema and Migrations", and contentType "text/plain".