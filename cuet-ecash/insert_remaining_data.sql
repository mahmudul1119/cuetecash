-- Insert remaining data for CUET E-Cash System
USE cuet_ecash;

-- Insert halls (missing) - each hall gets unique officer assignment
INSERT INTO hall (hall_name, capacity, officer_id) VALUES 
('Bangabandhu Sheikh Mujibur Rahman Hall', 300, 2),
('Shaheed Abdur Rob Hall', 250, 3),
('Pritilata Hall', 200, 1),
('Kazi Nazrul Islam Hall', 280, NULL),
('Shah Amanat Hall', 320, NULL);

-- Insert students
INSERT INTO student (full_name, department, batch, address, current_semester, mobile_no, roll_no, hall_id, user_id) VALUES 
('Mohammad Hassan', 'CSE', 2020, 'Chittagong, Bangladesh', 7, '01712345678', '2003001', 1, 4),
('Fatema Khatun', 'EEE', 2021, 'Dhaka, Bangladesh', 5, '01812345679', '2103045', 3, 5);

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

-- Verify all data
SELECT 'Data insertion completed' as Status;
SELECT 
    (SELECT COUNT(*) FROM user_table) as users,
    (SELECT COUNT(*) FROM officer) as officers,
    (SELECT COUNT(*) FROM hall) as halls,
    (SELECT COUNT(*) FROM student) as students,
    (SELECT COUNT(*) FROM notice) as notices,
    (SELECT COUNT(*) FROM semester_fee) as semester_fees,
    (SELECT COUNT(*) FROM hall_fee) as hall_fees,
    (SELECT COUNT(*) FROM payment) as payments,
    (SELECT COUNT(*) FROM exam_approval) as exam_approvals; 