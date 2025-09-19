-- Cleanup script for CUET E-Cash database
-- This will drop all existing tables to start fresh

USE cuet_ecash;

-- Disable foreign key checks to allow dropping tables in any order
SET FOREIGN_KEY_CHECKS = 0;

-- Drop all tables if they exist
DROP TABLE IF EXISTS exam_approval;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS hall_fee;
DROP TABLE IF EXISTS semester_fee;
DROP TABLE IF EXISTS notice;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS hall;
DROP TABLE IF EXISTS officer;
DROP TABLE IF EXISTS user_table;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verify all tables are dropped
SHOW TABLES; 