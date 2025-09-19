-- Insert test users for CUET E-Cash System
-- Password for all accounts: password123 (BCrypt encoded)

-- Clear existing data (if any)
DELETE FROM exam_approval;
DELETE FROM payment;
DELETE FROM hall_fee;
DELETE FROM semester_fee;
DELETE FROM notice;
DELETE FROM student;
DELETE FROM hall;
DELETE FROM officer;
DELETE FROM user_table;

-- Insert test users with proper BCrypt passwords
INSERT INTO user_table (email, password, role) VALUES 
('admin@cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'ADMIN'),
('hallofficer@cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'HALL_OFFICER'),
('officer@cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'OFFICER'),
('student1@student.cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'STUDENT'),
('student2@student.cuet.ac.bd', '$2a$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu', 'STUDENT');

-- Insert officers
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

-- Verify the data was inserted
SELECT 'Test Data Insertion Complete' as Status;
SELECT COUNT(*) as user_count FROM user_table;
SELECT email, role FROM user_table; 