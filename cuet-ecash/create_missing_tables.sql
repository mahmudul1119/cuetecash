-- Create missing tables for CUET E-Cash
USE cuet_ecash;

-- Create payment table
CREATE TABLE payment (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    receipt_url VARCHAR(500),
    student_id INT NOT NULL,
    semester_fee_id INT,
    hall_fee_id INT,
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'COMPLETED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (semester_fee_id) REFERENCES semester_fee(semester_fee_id) ON DELETE SET NULL,
    FOREIGN KEY (hall_fee_id) REFERENCES hall_fee(hall_fee_id) ON DELETE SET NULL,
    INDEX idx_student_id (student_id),
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_date (date),
    INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB;

-- Create exam_approval table
CREATE TABLE exam_approval (
    approval_id INT PRIMARY KEY AUTO_INCREMENT,
    request_date DATE NOT NULL,
    approval_date DATE,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    approval_type VARCHAR(50) NOT NULL,
    officer_id INT,
    payment_id INT NOT NULL,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (officer_id) REFERENCES officer(officer_id) ON DELETE SET NULL,
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_approval_type (approval_type),
    INDEX idx_request_date (request_date)
) ENGINE=InnoDB;

-- Verify all tables exist
SHOW TABLES; 