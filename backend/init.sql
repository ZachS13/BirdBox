-- Bird Box Monitoring System - MySQL 8 Schema
SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE DATABASE IF NOT EXISTS birdbox_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE birdbox_db;

-- USERS
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin','manager','technician','viewer') NOT NULL DEFAULT 'viewer',
  created_at    DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at    DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  last_login_at DATETIME(6) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
);

-- TECHNICIANS
DROP TABLE IF EXISTS technicians;
CREATE TABLE technicians (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(190) NOT NULL,
  phone      VARCHAR(40) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_technicians_email (email)
);

-- SPECIES
DROP TABLE IF EXISTS species;
CREATE TABLE species (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  common_name     VARCHAR(120) NOT NULL,
  scientific_name VARCHAR(160) NULL,
  is_target       TINYINT(1) NOT NULL DEFAULT 0,
  created_at      DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at      DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_species_common (common_name)
);

-- BOXES
DROP TABLE IF EXISTS boxes;
CREATE TABLE boxes (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name            VARCHAR(120) NOT NULL,
  trail_name      VARCHAR(160) NULL,
  status          ENUM('occupied','vacant','reading','offline') NOT NULL DEFAULT 'vacant',
  lat             DECIMAL(9,6) NULL,
  lng             DECIMAL(9,6) NULL,
  installed_at    DATETIME(6) NULL,
  target_species  BIGINT UNSIGNED NULL,
  notes           TEXT NULL,
  created_at      DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at      DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY ix_boxes_status (status),
  KEY ix_boxes_location (lat, lng),
  CONSTRAINT fk_boxes_target_species FOREIGN KEY (target_species)
    REFERENCES species(id) ON DELETE SET NULL
);

-- IMAGES
DROP TABLE IF EXISTS images;
CREATE TABLE images (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  box_id         BIGINT UNSIGNED NOT NULL,
  captured_at    DATETIME(6) NOT NULL,
  file_url       VARCHAR(512) NOT NULL,
  mime_type      VARCHAR(100) NULL,
  filesize_bytes BIGINT UNSIGNED NULL,
  sha256         CHAR(64) NULL,
  caption        VARCHAR(255) NULL,
  created_at     DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY ix_images_box_time (box_id, captured_at),
  CONSTRAINT fk_images_box FOREIGN KEY (box_id)
    REFERENCES boxes(id) ON DELETE CASCADE
);

-- TELEMETRY READINGS
DROP TABLE IF EXISTS telemetry_readings;
CREATE TABLE telemetry_readings (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  box_id        BIGINT UNSIGNED NOT NULL,
  recorded_at   DATETIME(6) NOT NULL,
  battery_pct   DECIMAL(5,2) NULL,
  signal_pct    DECIMAL(5,2) NULL,
  temperature_f DECIMAL(5,2) NULL,
  humidity_pct  DECIMAL(5,2) NULL,
  created_at    DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY ix_tel_box_time (box_id, recorded_at),
  CONSTRAINT fk_tel_box FOREIGN KEY (box_id)
    REFERENCES boxes(id) ON DELETE CASCADE
);

-- DETECTIONS
DROP TABLE IF EXISTS detections;
CREATE TABLE detections (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  box_id         BIGINT UNSIGNED NOT NULL,
  detected_at    DATETIME(6) NOT NULL,
  species_id     BIGINT UNSIGNED NOT NULL,
  confidence_pct DECIMAL(5,2) NULL,
  activity       ENUM('perching','nesting','flight','entering','exiting','unknown')
                   NOT NULL DEFAULT 'unknown',
  image_id       BIGINT UNSIGNED NULL,
  created_at     DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY ix_det_box_time (box_id, detected_at),
  KEY ix_det_species (species_id),
  CONSTRAINT fk_det_box FOREIGN KEY (box_id)
    REFERENCES boxes(id) ON DELETE CASCADE,
  CONSTRAINT fk_det_species FOREIGN KEY (species_id)
    REFERENCES species(id) ON DELETE RESTRICT,
  CONSTRAINT fk_det_image FOREIGN KEY (image_id)
    REFERENCES images(id) ON DELETE SET NULL
);

-- MAINTENANCE LOGS
DROP TABLE IF EXISTS maintenance_logs;
CREATE TABLE maintenance_logs (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  box_id        BIGINT UNSIGNED NOT NULL,
  performed_at  DATETIME(6) NOT NULL,
  type          VARCHAR(100) NOT NULL,
  technician_id BIGINT UNSIGNED NULL,
  notes         TEXT NULL,
  created_at    DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY ix_maint_box_time (box_id, performed_at),
  CONSTRAINT fk_maint_box FOREIGN KEY (box_id)
    REFERENCES boxes(id) ON DELETE CASCADE,
  CONSTRAINT fk_maint_tech FOREIGN KEY (technician_id)
    REFERENCES technicians(id) ON DELETE SET NULL
);

-- MAINTENANCE SCHEDULES
DROP TABLE IF EXISTS maintenance_schedules;
CREATE TABLE maintenance_schedules (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  box_id        BIGINT UNSIGNED NOT NULL,
  due_at        DATETIME(6) NOT NULL,
  type          VARCHAR(100) NOT NULL,
  priority      ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
  technician_id BIGINT UNSIGNED NULL,
  is_recurring  TINYINT(1) NOT NULL DEFAULT 0,
  rrule         VARCHAR(255) NULL, -- e.g., 'FREQ=MONTHLY;INTERVAL=3'
  status        ENUM('scheduled','done','canceled') NOT NULL DEFAULT 'scheduled',
  created_at    DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at    DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY ix_sched_box_due (box_id, due_at),
  CONSTRAINT fk_sched_box FOREIGN KEY (box_id)
    REFERENCES boxes(id) ON DELETE CASCADE,
  CONSTRAINT fk_sched_tech FOREIGN KEY (technician_id)
    REFERENCES technicians(id) ON DELETE SET NULL
);

-- ACTIVITY FEED
DROP TABLE IF EXISTS activity_feed;
CREATE TABLE activity_feed (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  box_id      BIGINT UNSIGNED NOT NULL,
  occurred_at DATETIME(6) NOT NULL,
  kind        ENUM('status_change','detection','maintenance','system') NOT NULL,
  summary     VARCHAR(255) NOT NULL,
  meta_json   JSON NULL,
  created_at  DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY ix_activity_box_time (box_id, occurred_at),
  CONSTRAINT fk_activity_box FOREIGN KEY (box_id)
    REFERENCES boxes(id) ON DELETE CASCADE
);

-- EXPORTS (optional)
DROP TABLE IF EXISTS exports;
CREATE TABLE exports (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id     BIGINT UNSIGNED NOT NULL,
  created_at  DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  kind        ENUM('detections','telemetry','maintenance') NOT NULL,
  params_json JSON NULL,
  file_url    VARCHAR(512) NULL,
  status      ENUM('pending','ready','failed') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (id),
  KEY ix_exports_user_time (user_id, created_at),
  CONSTRAINT fk_exports_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE
);

-- VIEWS (helpers)
DROP VIEW IF EXISTS v_box_latest_telemetry;
CREATE VIEW v_box_latest_telemetry AS
SELECT t1.*
FROM telemetry_readings t1
JOIN (
  SELECT box_id, MAX(recorded_at) AS max_time
  FROM telemetry_readings
  GROUP BY box_id
) t2 ON t1.box_id = t2.box_id AND t1.recorded_at = t2.max_time;

DROP VIEW IF EXISTS v_box_latest_detection;
CREATE VIEW v_box_latest_detection AS
SELECT d1.*
FROM detections d1
JOIN (
  SELECT box_id, MAX(detected_at) AS max_time
  FROM detections
  GROUP BY box_id
) d2 ON d1.box_id = d2.box_id AND d1.detected_at = d2.max_time;