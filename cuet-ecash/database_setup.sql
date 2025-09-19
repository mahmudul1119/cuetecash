-- CUET E-Cash Database Setup Script
-- Run this script in MySQL Workbench to set up the database manually

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS cuet_ecash;
USE cuet_ecash;

-- Drop existing tables (if any) in correct order due to foreign key constraints
DROP TABLE IF EXISTS exam_approval;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS hall_fee;
DROP TABLE IF EXISTS semester_fee;
DROP TABLE IF EXISTS notice;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS hall;
DROP TABLE IF EXISTS officer;
DROP TABLE IF EXISTS user_table;

-- Create tables (schema)
CREATE TABLE user_table (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE officer (
    officer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    added_by_officer_id INT,
    user_id INT,
    FOREIGN KEY (added_by_officer_id) REFERENCES officer(officer_id),
    FOREIGN KEY (user_id) REFERENCES user_table(user_id)
);

CREATE TABLE hall (
    hall_id INT PRIMARY KEY AUTO_INCREMENT,
    hall_name VARCHAR(100) NOT NULL,
    capacity INT,
    officer_id INT,
    FOREIGN KEY (officer_id) REFERENCES officer(officer_id)
);

CREATE TABLE student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    batch INT NOT NULL,
    address VARCHAR(255),
    current_semester INT NOT NULL,
    mobile_no VARCHAR(20),
    roll_no VARCHAR(20) UNIQUE,
    hall_id INT,
    user_id INT,
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id),
    FOREIGN KEY (user_id) REFERENCES user_table(user_id)
);

CREATE TABLE notice (
    notice_id INT PRIMARY KEY AUTO_INCREMENT,
    notice_type VARCHAR(50),
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    posted_at TIMESTAMP NOT NULL,
    officer_id INT,
    FOREIGN KEY (officer_id) REFERENCES officer(officer_id)
);

CREATE TABLE hall_fee (
    hall_fee_id INT PRIMARY KEY AUTO_INCREMENT,
    semester_id INT,
    batch_no INT,
    hall_id INT,
    h_fee DECIMAL(10, 2) NOT NULL,
    deadline DATE,
    late_fine DECIMAL(10, 2),
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id)
);

CREATE TABLE semester_fee (
    semester_fee_id INT PRIMARY KEY AUTO_INCREMENT,
    semester_id INT,
    batch_no INT,
    department VARCHAR(50),
    semester_fee DECIMAL(10, 2) NOT NULL,
    deadline DATE,
    late_fine DECIMAL(10, 2),
    officer_id INT,
    FOREIGN KEY (officer_id) REFERENCES officer(officer_id)
);

CREATE TABLE payment (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    payment_method VARCHAR(50),
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    receipt_url VARCHAR(255),
    student_id INT,
    semester_fee_id INT,
    hall_fee_id INT,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (semester_fee_id) REFERENCES semester_fee(semester_fee_id),
    FOREIGN KEY (hall_fee_id) REFERENCES hall_fee(hall_fee_id)
);

CREATE TABLE exam_approval (
    approval_id INT PRIMARY KEY AUTO_INCREMENT,
    request_date DATE,
    approval_date DATE,
    status VARCHAR(50) NOT NULL,
    approval_type VARCHAR(50) NOT NULL,
    officer_id INT,
    payment_id INT,
    FOREIGN KEY (officer_id) REFERENCES officer(officer_id),
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
);

-- Insert initial data
-- Insert initial users (password: "password123" - bcrypt hashed)
INSERT INTO user_table (email, password, role) VALUES 
('admin@cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'ADMIN'),
('hallofficer@cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'HALL_OFFICER'),
('officer@cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'OFFICER'),
('student1@student.cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'STUDENT'),
('student2@student.cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'STUDENT');

-- Insert officers (must be after users)
INSERT INTO officer (full_name, designation, department, added_by_officer_id, user_id) VALUES 
('Dr. Md. Rezaul Karim', 'Registrar', 'Administration', NULL, 1),
('Md. Abdul Rahman', 'Hall Provost', 'CSE', NULL, 2),
('Prof. Shahida Begum', 'Assistant Registrar', 'EEE', 1, 3);

-- Insert halls
INSERT INTO hall (hall_name, capacity, officer_id) VALUES 
('Bangabandhu Sheikh Mujibur Rahman Hall', 300, 2),
('Shaheed Abdur Rob Hall', 250, 2),
('Pritilata Hall', 200, 2),
('Kazi Nazrul Islam Hall', 280, 2),
('Shah Amanat Hall', 320, 2);

-- Insert students
INSERT INTO student (full_name, department, batch, address, current_semester, mobile_no, roll_no, hall_id, user_id) VALUES 
('Mohammad Hassan', 'CSE', 2020, 'Chittagong, Bangladesh', 7, '01712345678', '2003001', 1, 4),
('Fatema Khatun', 'EEE', 2021, 'Dhaka, Bangladesh', 5, '01812345679', '2103045', 3, 5);

-- Insert sample notices
INSERT INTO notice (notice_type, title, content, posted_at, officer_id) VALUES 
('GENERAL', 'Semester Fee Payment Notice', 'All students are requested to pay their semester fees before the deadline. Late payment will incur additional charges.', NOW(), 1),
('HALL', 'Hall Fee Due', 'Hostel residents must clear their hall fees by end of this month.', NOW(), 2),
('EXAM', 'Exam Form Submission', 'Students who have cleared all dues can submit their exam forms online.', NOW(), 3);

-- Insert semester fees
INSERT INTO semester_fee (semester_id, batch_no, department, semester_fee, deadline, late_fine, officer_id) VALUES 
(7, 2020, 'CSE', 8500.00, '2024-01-31', 500.00, 1),
(5, 2021, 'EEE', 8500.00, '2024-01-31', 500.00, 1),
(6, 2021, 'CSE', 8500.00, '2024-01-31', 500.00, 1),
(8, 2020, 'EEE', 8500.00, '2024-01-31', 500.00, 1);

-- Insert hall fees
INSERT INTO hall_fee (semester_id, batch_no, hall_id, h_fee, deadline, late_fine) VALUES 
(7, 2020, 1, 3000.00, '2024-01-31', 200.00),
(5, 2021, 3, 3000.00, '2024-01-31', 200.00),
(6, 2021, 1, 3000.00, '2024-01-31', 200.00),
(8, 2020, 1, 3000.00, '2024-01-31', 200.00);

-- Insert sample payments
INSERT INTO payment (transaction_id, payment_method, amount, date, receipt_url, student_id, semester_fee_id, hall_fee_id) VALUES 
('TXN001234567890', 'bKash', 8500.00, '2024-01-15', 'https://example.com/receipts/txn001234567890.pdf', 1, 1, NULL),
('TXN001234567891', 'Nagad', 3000.00, '2024-01-16', 'https://example.com/receipts/txn001234567891.pdf', 1, NULL, 1),
('TXN001234567892', 'Bank Transfer', 8500.00, '2024-01-17', 'https://example.com/receipts/txn001234567892.pdf', 2, 2, NULL);

-- Insert exam approvals
INSERT INTO exam_approval (request_date, approval_date, status, approval_type, officer_id, payment_id) VALUES 
('2024-01-18', '2024-01-19', 'APPROVED', 'SEMESTER_EXAM', 1, 1),
('2024-01-20', NULL, 'PENDING', 'SEMESTER_EXAM', 1, 3);

-- Verify data was inserted
SELECT 'Users' as TableName, COUNT(*) as RecordCount FROM user_table
UNION ALL
SELECT 'Officers', COUNT(*) FROM officer
UNION ALL
SELECT 'Halls', COUNT(*) FROM hall
UNION ALL
SELECT 'Students', COUNT(*) FROM student
UNION ALL
SELECT 'Notices', COUNT(*) FROM notice
UNION ALL
SELECT 'Semester Fees', COUNT(*) FROM semester_fee
UNION ALL
SELECT 'Hall Fees', COUNT(*) FROM hall_fee
UNION ALL
SELECT 'Payments', COUNT(*) FROM payment
UNION ALL
SELECT 'Exam Approvals', COUNT(*) FROM exam_approval;

-- Test login credentials:
-- Admin: admin@cuet.ac.bd / password123
-- Hall Officer: hallofficer@cuet.ac.bd / password123
-- Officer: officer@cuet.ac.bd / password123
-- Student 1: student1@student.cuet.ac.bd / password123
-- Student 2: student2@student.cuet.ac.bd / password123 