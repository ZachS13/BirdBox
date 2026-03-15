DROP DATABASE IF EXISTS glt_dashboard;

CREATE DATABASE glt_dashboard;

USE glt_dashboard;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(250) NULL UNIQUE,
    password CHAR(60) NOT NULL,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- SELECT * FROM users

INSERT INTO users VALUES
(1, "Balsha98", "balsa.bazovic@gmail.com", "$2b$10$kcq5SbH7qRcjH.F7Xi18OeLmKXsph4NQ6gJ08X6G7wb5nlKkxK4r2", NOW(), NOW(), NOW());

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token CHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sessions_users
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- SELECT * FROM sessions;

CREATE TABLE birdboxes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    trail_name VARCHAR(150) NOT NULL,
    latitude DECIMAL(9, 7) NOT NULL,
    longitude DECIMAL(9, 7) NOT NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO birdboxes VALUES
(1, "BirdBox 1", "Cornwall Preserve", 43.2236531, -77.303918, "", NOW(), NOW()),
(2, "BirdBox 2", "Deer Creek Woods East", 43.2660249, -77.3533357, "", NOW(), NOW()),
(3, "BirdBox 3", "Deer Creek Woods West", 43.2691929, -77.3542229, "", NOW(), NOW()),
(4, "BirdBox 4", "Ganargua Creek Meadow Preserve", 43.0439733, -77.343519, "", NOW(), NOW()),
(5, "BirdBox 5", "Irene Gossin Nature Preserve", 43.162653, -77.476247, "", NOW(), NOW());

CREATE TABLE birdbox_telemetry (
    id INT AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    battery_life INT,
    temperature INT,
    humidity INT,
    recorded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (birdbox_id),
    CONSTRAINT fk_telemetry_birdboxes
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE birdbox_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    file_url VARCHAR(500),
    file_type VARCHAR(50),
    file_size INT,
    encryption CHAR(1),
    captured_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (birdbox_id),
    CONSTRAINT fk_images_birdboxes
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250),
    is_target INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE specie_detections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    species_id INT NOT NULL,
    image_id INT NOT NULL,
    confidence_pct DECIMAL(5,2),
    activity ENUM("perching","feeding","flying","other"),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (birdbox_id),
    INDEX (species_id),
    INDEX (image_id),
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
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- CREATE TABLE maintenance_logs (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     birdbox_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
--         ON UPDATE CURRENT_TIMESTAMP,
--     INDEX (user_id),
--     INDEX (birdbox_id),
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
    id INT AUTO_INCREMENT PRIMARY KEY,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,
    INDEX (user_id),
    INDEX (birdbox_id),
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    total_kestrels INT DEFAULT 0,
    total_brown_bats INT DEFAULT 0,
    total_others INT DEFAULT 0,
    range_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    range_end TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (birdbox_id),
    CONSTRAINT fk_history_birdboxes
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE exports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM("csv","pdf","json") NOT NULL,
    url VARCHAR(500),
    status ENUM("pending","completed","failed") DEFAULT "pending",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id),
    CONSTRAINT fk_exports_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE app_error_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    heading VARCHAR(250),
    description TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id),
    CONSTRAINT fk_errors_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;
