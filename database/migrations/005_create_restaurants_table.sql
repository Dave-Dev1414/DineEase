CREATE TABLE restaurants (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    owner_id INT UNSIGNED NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'Nigeria',
    phone VARCHAR(30) NULL,
    image_url VARCHAR(500) NULL,
    business_scale ENUM(
        'MICRO',
        'SMALL',
        'MEDIUM',
        'LARGE',
        'ENTERPRISE'
    ) NOT NULL DEFAULT 'MICRO',
    verification_status ENUM(
        'PENDING',
        'UNDER_REVIEW',
        'VERIFIED',
        'REJECTED'
    ) NOT NULL DEFAULT 'PENDING',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_restaurants_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);