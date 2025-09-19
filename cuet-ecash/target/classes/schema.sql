-- Create database if not exists (handled by application.properties)
-- USE cuet_ecash;

CREATE TABLE user_table (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE officer (
    officer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    added_by_officer_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (added_by_officer_id) REFERENCES officer(officer_id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES user_table(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_id (user_id)
) ENGINE=InnoDB;

CREATE TABLE hall (
    hall_id INT PRIMARY KEY AUTO_INCREMENT,
    hall_name VARCHAR(100) NOT NULL UNIQUE,
    capacity INT DEFAULT 0,
    officer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (officer_id) REFERENCES officer(officer_id) ON DELETE SET NULL,
    UNIQUE KEY unique_officer_id (officer_id)
) ENGINE=InnoDB;

CREATE TABLE student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    batch INT NOT NULL,
    address TEXT,
    current_semester INT NOT NULL,
    mobile_no VARCHAR(20),
    roll_no VARCHAR(20) UNIQUE,
    hall_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES user_table(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_id (user_id),
    INDEX idx_department (department),
    INDEX idx_batch (batch)
) ENGINE=InnoDB;

CREATE TABLE notice (
    notice_id INT PRIMARY KEY AUTO_INCREMENT,
    notice_type VARCHAR(50) DEFAULT 'GENERAL',
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    officer_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (officer_id) REFERENCES officer(officer_id) ON DELETE SET NULL,
    INDEX idx_notice_type (notice_type),
    INDEX idx_posted_at (posted_at)
) ENGINE=InnoDB;

CREATE TABLE hall_fee (
    hall_fee_id INT PRIMARY KEY AUTO_INCREMENT,
    semester_id INT NOT NULL,
    batch_no INT NOT NULL,
    hall_id INT NOT NULL,
    h_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    deadline DATE NOT NULL,
    late_fine DECIMAL(10, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hall_id) REFERENCES hall(hall_id) ON DELETE CASCADE,
    UNIQUE KEY unique_semester_batch_hall (semester_id, batch_no, hall_id),
    INDEX idx_deadline (deadline)
) ENGINE=InnoDB;

CREATE TABLE semester_fee (
    semester_fee_id INT PRIMARY KEY AUTO_INCREMENT,
    semester_id INT NOT NULL,
    batch_no INT NOT NULL,
    department VARCHAR(50) NOT NULL,
    semester_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    deadline DATE NOT NULL,
    late_fine DECIMAL(10, 2) DEFAULT 0.00,
    officer_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (officer_id) REFERENCES officer(officer_id) ON DELETE SET NULL,
    UNIQUE KEY unique_semester_batch_dept (semester_id, batch_no, department),
    INDEX idx_deadline (deadline),
    INDEX idx_department (department)
) ENGINE=InnoDB;

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

