USE cuet_ecash;

-- Add the missing admin user with password "password123"
INSERT INTO user_table (email, password, role, created_at, updated_at) 
VALUES ('admin@cuet.ac.bd', '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW', 'ADMIN', NOW(), NOW());

-- Add frontend demo emails as aliases with password "123123" 
-- BCrypt hash for "123123": $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO user_table (email, password, role, created_at, updated_at) VALUES
('admin@cuet.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', NOW(), NOW()),
('mahmudul@cuet.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', NOW(), NOW()),
('hall.officer@cuet.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'HALL_OFFICER', NOW(), NOW()),
('dept.officer@cuet.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'OFFICER', NOW(), NOW());

-- Update existing users to have password "123123" for easier testing
UPDATE user_table SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE email IN (
    'hallofficer@cuet.ac.bd',
    'officer@cuet.ac.bd', 
    'student1@student.cuet.ac.bd',
    'student2@student.cuet.ac.bd'
); 