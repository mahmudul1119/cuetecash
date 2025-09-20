-- Initial data for CUET E-Cash System
-- This file contains sample data for testing and initial setup

USE cuet_ecash;

-- Insert initial users with plain text passwords (NO ENCRYPTION)
-- Password for all accounts: password123 (Plain text)
-- Password for frontend accounts: 123123 (Plain text)
INSERT INTO user_table (email, password, role) VALUES 
('admin@cuet.ac.bd', 'password123', 'ADMIN'),
('hallofficer@cuet.ac.bd', 'password123', 'HALL_OFFICER'),
('officer@cuet.ac.bd', 'password123', 'OFFICER'),
('student1@student.cuet.ac.bd', 'password123', 'STUDENT'),
('student2@student.cuet.ac.bd', 'password123', 'STUDENT'),
-- Frontend compatible credentials with password: 123123 (Plain text)
('mahmudul@cuet.edu', '123123', 'STUDENT'),
('hall.officer@cuet.edu', '123123', 'HALL_OFFICER'),
('dept.officer@cuet.edu', '123123', 'OFFICER'),
('admin@cuet.edu', '123123', 'ADMIN'),
-- Additional test user
('ahmedabrarzayad@gmail.com', '123123', 'ADMIN');

-- Insert officers (must be after users)
INSERT INTO officer (full_name, designation, department, added_by_officer_id, user_id) VALUES 
('Dr. Md. Rezaul Karim', 'Registrar', 'Administration', NULL, 1),
('Md. Abdul Rahman', 'Hall Provost', 'CSE', NULL, 2),
('Prof. Shahida Begum', 'Assistant Registrar', 'EEE', 1, 3),
('Hall Officer', 'Hall Officer', 'Hall Management', NULL, 7),
('Department Officer', 'Department Officer', 'Academic', NULL, 8),
('System Admin', 'System Administrator', 'IT', NULL, 9),
('Ahmed Abrar Zayad', 'System Administrator', 'IT', NULL, 10);

-- Insert halls (each hall needs a unique officer_id due to unique constraint)
INSERT INTO hall (hall_name, capacity, officer_id) VALUES 
('Bangabandhu Sheikh Mujibur Rahman Hall', 300, 2),
('Shaheed Abdur Rob Hall', 250, 4),
('Pritilata Hall', 200, 5),
('Kazi Nazrul Islam Hall', 280, 6),
('Shah Amanat Hall', 320, 3);

-- Insert students
INSERT INTO student (full_name, department, batch, address, current_semester, mobile_no, roll_no, hall_id, user_id) VALUES 
('Mohammad Hassan', 'CSE', 2020, 'Chittagong, Bangladesh', 7, '01712345678', '2003001', 1, 4),
('Fatema Khatun', 'EEE', 2021, 'Dhaka, Bangladesh', 5, '01812345679', '2103045', 3, 5),
('Mahmudul Islam', 'CSE', 2020, 'Chittagong, Bangladesh', 7, '01712345680', '2003002', 1, 6);

-- Insert sample notices
INSERT INTO notice (notice_type, title, content, officer_id) VALUES 
('GENERAL', 'Semester Fee Payment Notice', 'All students are requested to pay their semester fees before the deadline. Late payment will incur additional charges.', 1),
('HALL', 'Hall Fee Due', 'Hostel residents must clear their hall fees by end of this month.', 2),
('EXAM', 'Exam Form Submission', 'Students who have cleared all dues can submit their exam forms online.', 3);

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
INSERT INTO exam_approval (request_date, approval_date, status, approval_type, officer_id, payment_id, comments) VALUES 
('2024-01-18', '2024-01-19', 'APPROVED', 'SEMESTER_EXAM', 1, 1, 'Fee payment verified and approved'),
('2024-01-20', NULL, 'PENDING', 'SEMESTER_EXAM', 1, 3, 'Under review by academic office');

-- Note: Default password for all test accounts is "password123"
-- Admin credentials: admin@cuet.ac.bd / password123
-- Student credentials: student1@student.cuet.ac.bd / password123

