ALTER TABLE users
ADD COLUMN email_verification_token VARCHAR(255) NULL AFTER email_verified_at,
ADD COLUMN email_verification_expires_at TIMESTAMP NULL AFTER email_verification_token;