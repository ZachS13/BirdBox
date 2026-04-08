DROP DATABASE IF EXISTS glt_dashboard;

CREATE DATABASE glt_dashboard;

USE glt_dashboard;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(250) NULL UNIQUE,
    password CHAR(60) NOT NULL,
    last_login_at DATETIME NOT NULL,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- SELECT * FROM users

INSERT INTO users VALUES
(1, "Balsha98", "balsa.bazovic@gmail.com", "$2b$10$kcq5SbH7qRcjH.F7Xi18OeLmKXsph4NQ6gJ08X6G7wb5nlKkxK4r2", NOW(), NOW(), NOW());

CREATE TABLE sessions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token CHAR(60) NOT NULL,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sessions_users
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- SELECT * FROM sessions;

CREATE TABLE birdboxes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    trail_name VARCHAR(150) NOT NULL,
    latitude DECIMAL(9, 7) NOT NULL,
    longitude DECIMAL(9, 7) NOT NULL,
    notes TEXT NULL,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO birdboxes VALUES
(1, "BirdBox 1", "Cornwall Preserve", 43.2236531, -77.303918, "", NOW(), NOW()),
(2, "BirdBox 2", "Deer Creek Woods East", 43.2660249, -77.3533357, "", NOW(), NOW()),
(3, "BirdBox 3", "Deer Creek Woods West", 43.2691929, -77.3542229, "", NOW(), NOW()),
(4, "BirdBox 4", "Ganargua Creek Meadow Preserve", 43.0439733, -77.343519, "", NOW(), NOW()),
(5, "BirdBox 5", "Irene Gossin Nature Preserve", 43.162653, -77.476247, "", NOW(), NOW());

CREATE TABLE birdbox_telemetry (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    battery_life INT NOT NULL,
    -- temperature INT,
    -- humidity INT,
    recorded_at DATETIME NOT NULL,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_telemetry_birdboxes
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO birdbox_telemetry VALUES
(1, 1, 80, NOW(), NOW()),
(2, 2, 64, NOW(), NOW()),
(3, 3, 32, NOW(), NOW()),
(4, 4, 56, NOW(), NOW()),
(5, 5, 12, NOW(), NOW());

CREATE TABLE birdbox_images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    file_url VARCHAR(64) NOT NULL,
    file_type VARCHAR(8) NOT NULL,
    file_size FLOAT NOT NULL,
    -- encryption CHAR(1),
    captured_at DATETIME NOT NULL,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_images_birdboxes
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- SELECT * FROM birdbox_images; 

INSERT INTO birdbox_images VALUES
(1, 3, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 15667.20, '2026-02-05 08:23:11', NOW()),
(2, 1, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 14203.45, '2026-02-07 09:14:32', NOW()),
(3, 5, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 16890.12, '2026-02-10 07:45:55', NOW()),
(4, 2, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 13456.78, '2026-02-12 11:22:43', NOW()),
(5, 4, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 15234.90, '2026-02-15 06:33:21', NOW()),
(6, 1, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 14789.34, '2026-02-18 08:55:17', NOW()),
(7, 3, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 16123.67, '2026-02-21 10:12:44', NOW()),
(8, 5, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 13987.23, '2026-02-24 07:28:59', NOW()),
(9, 2, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 15543.11, '2026-02-27 09:44:36', NOW()),
(10, 4, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 14321.89, '2026-02-30 11:05:22', NOW()),
(11, 1, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 16234.56, '2026-03-02 08:17:48', NOW()),
(12, 3, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 13678.90, '2026-03-05 07:33:15', NOW()),
(13, 5, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 15890.23, '2026-03-08 10:48:52', NOW()),
(14, 2, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 14567.45, '2026-03-11 06:22:39', NOW()),
(15, 4, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 16012.78, '2026-03-14 09:37:26', NOW()),
(16, 1, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 13234.12, '2026-03-17 11:53:13', NOW()),
(17, 3, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 15678.34, '2026-03-20 07:08:50', NOW()),
(18, 5, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 14890.67, '2026-03-23 08:24:37', NOW()),
(19, 2, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 16345.90, '2026-03-26 10:39:24', NOW()),
(20, 4, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 13123.23, '2026-04-01 06:55:11', NOW()),
(21, 1, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 15456.56, '2026-04-04 09:10:58', NOW()),
(22, 3, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 14678.89, '2026-04-07 11:26:45', NOW()),
(23, 5, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 16789.12, '2026-04-10 07:41:32', NOW()),
(24, 2, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o9p.webp', 'webp', 13901.45, '2026-04-13 08:57:19', NOW()),
(25, 4, '/assets/images/3f2a1b4c5d6e7f8g9h2j3k4l5m6n7o8p.webp', 'webp', 15012.78, '2026-04-16 10:12:06', NOW());

CREATE TABLE species (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    is_target INT NOT NULL DEFAULT 0,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO species (id, name, is_target) VALUES
(1, "American Kestrel", 1),
(2, "Brown Bat", 1),
(3, "Other", 0);

CREATE TABLE species_detections (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    species_id INT NOT NULL,
    image_id INT NULL DEFAULT 0,
    confidence_pct DECIMAL(3, 1) NOT NULL,
    -- activity ENUM("perching","feeding","flying","other") NOT NULL,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_detections_birdboxes
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_detection_species
        FOREIGN KEY (species_id)
        REFERENCES species(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_detection_image
        FOREIGN KEY (image_id)
        REFERENCES birdbox_images(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO species_detections VALUES
(1, 3, 1, 1, 92.5, '2026-02-05 08:23:11'),
(2, 1, 2, 2, 88.0, '2026-02-07 09:14:32'),
(3, 5, 1, 3, 95.5, '2026-02-10 07:45:55'),
(4, 2, 2, 4, 83.0, '2026-02-12 11:22:43'),
(5, 4, 1, 5, 97.5, '2026-02-15 06:33:21'),
(6, 1, 2, 6, 86.5, '2026-02-18 08:55:17'),
(7, 3, 1, 7, 91.0, '2026-02-21 10:12:44'),
(8, 5, 2, 8, 84.5, '2026-02-24 07:28:59'),
(9, 2, 1, 9, 98.0, '2026-02-27 09:44:36'),
(10, 4, 2, 10, 89.5, '2026-02-30 11:05:22'),
(11, 1, 1, 11, 93.0, '2026-03-02 08:17:48'),
(12, 3, 2, 12, 82.5, '2026-03-05 07:33:15'),
(13, 5, 1, 13, 96.0, '2026-03-08 10:48:52'),
(14, 2, 2, 14, 87.0, '2026-03-11 06:22:39'),
(15, 4, 1, 15, 99.5, '2026-03-14 09:37:26'),
(16, 1, 2, 16, 85.5, '2026-03-17 11:53:13'),
(17, 3, 1, 17, 94.0, '2026-03-20 07:08:50'),
(18, 5, 2, 18, 81.0, '2026-03-23 08:24:37'),
(19, 2, 1, 19, 90.5, '2026-03-26 10:39:24'),
(20, 4, 2, 20, 83.5, '2026-04-01 06:55:11'),
(21, 1, 1, 21, 97.0, '2026-04-04 09:10:58'),
(22, 3, 2, 22, 88.5, '2026-04-07 11:26:45'),
(23, 5, 1, 23, 92.0, '2026-04-10 07:41:32'),
(24, 2, 2, 24, 86.0, '2026-04-13 08:57:19'),
(25, 4, 1, 25, 95.0, '2026-04-16 10:12:06');

-- CREATE TABLE maintenance_logs (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     birdbox_id INT NOT NULL,
--     created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     CONSTRAINT fk_logs_users
--         FOREIGN KEY (user_id)
--         REFERENCES users(id)
--         ON DELETE CASCADE,
--     CONSTRAINT fk_logs_birdboxes
--         FOREIGN KEY (birdbox_id)
--         REFERENCES birdboxes(id)
--         ON DELETE CASCADE
-- ) ENGINE=InnoDB;

CREATE TABLE maintenance_schedules (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    birdbox_id INT NOT NULL,
    title VARCHAR(250) NOT NULL,
    priority ENUM("low","medium","high") NOT NULL,
    is_recurring INT NULL DEFAULT 0,
    recurring_days INT NULL DEFAULT 0,
    notes TEXT NULL,
    status ENUM("cancelled", "doing", "completed") NULL DEFAULT "doing",
    created_by INT NOT NULL,
    deadline DATETIME NOT NULL,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_logs_birdboxes
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- SELECT * FROM maintenance_schedules;

CREATE TABLE birdbox_overview_history (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    total_kestrels INT NULL DEFAULT 0,
    total_brown_bats INT NULL DEFAULT 0,
    total_others INT NULL DEFAULT 0,
    range_start DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    range_end DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_history_birdboxes
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE exports (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM("csv","pdf", "json") NOT NULL,
    url VARCHAR(500) NOT NULL,
    status ENUM("pending","completed","failed") NULL DEFAULT "pending",
    created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_exports_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE app_error_logs (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    heading VARCHAR(250) NOT NULL,
    description TEXT NOT NULL,
    recorded_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_errors_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
) ENGINE=InnoDB;
