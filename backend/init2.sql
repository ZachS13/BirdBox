CREATE DATABASE birdbox;
USE birdbox;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL,
    phone VARCHAR(25),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE app_error_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    heading VARCHAR(255),
    description VARCHAR(1000),
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id),
    CONSTRAINT fk_error_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE birdboxes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    trail_name VARCHAR(150),
    latitude FLOAT,
    longitude FLOAT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE birdbox_telemetry (
    id INT AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    battery_life INT,
    temperature INT,
    humidity INT,
    recorded_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (birdbox_id),
    CONSTRAINT fk_telemetry_birdbox
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
    captured_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (birdbox_id),
    CONSTRAINT fk_images_birdbox
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    is_target INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE specie_detections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    species_id INT NOT NULL,
    image_id INT NOT NULL,
    confidence_pct DECIMAL(5,2),
    activity ENUM('perching','feeding','flying','other'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (birdbox_id),
    INDEX (species_id),
    INDEX (image_id),
    CONSTRAINT fk_detection_birdbox
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

CREATE TABLE maintenance_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    birdbox_id INT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (user_id),
    INDEX (birdbox_id),
    CONSTRAINT fk_maintenance_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_maintenance_birdbox
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE maintenance_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    maintenance_log_id INT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(1000),
    type VARCHAR(100),
    priority ENUM('low','medium','high'),
    is_recurring INT DEFAULT 0,
    status VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (maintenance_log_id),
    CONSTRAINT fk_schedule_log
        FOREIGN KEY (maintenance_log_id)
        REFERENCES maintenance_logs(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE birdbox_overview_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    birdbox_id INT NOT NULL,
    total_kestrels INT DEFAULT 0,
    total_brown_bats INT DEFAULT 0,
    total_others INT DEFAULT 0,
    range_start DATETIME,
    range_end DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (birdbox_id),
    CONSTRAINT fk_overview_birdbox
        FOREIGN KEY (birdbox_id)
        REFERENCES birdboxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE exports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('csv','pdf','json') NOT NULL,
    url VARCHAR(500),
    status ENUM('pending','completed','failed') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id),
    CONSTRAINT fk_exports_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;
