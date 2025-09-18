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

