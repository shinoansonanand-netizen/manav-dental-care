-- MANAV DENTAL CARE - Database Schema V1.0
-- Compatible with MySQL 8.0+, SQLAlchemy & Flask backends

CREATE DATABASE IF NOT EXISTS manav_dental_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE manav_dental_db;

CREATE TABLE IF NOT EXISTS appointments (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(25) NOT NULL,
  email VARCHAR(120) NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(60) NOT NULL,
  treatment VARCHAR(120) NOT NULL,
  message TEXT NULL,
  status ENUM('pending', 'contacted', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,

  -- Optimized Indexes for Admin filtering & Patient Search
  INDEX idx_appointments_phone (phone),
  INDEX idx_appointments_preferred_date (preferred_date),
  INDEX idx_appointments_status (status),
  INDEX idx_appointments_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
