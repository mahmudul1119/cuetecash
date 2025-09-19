@echo off
echo Adding frontend demo users...
mysql -u root -p12345678 -e "USE cuet_ecash; INSERT IGNORE INTO user_table (email, password, role, created_at, updated_at) VALUES ('admin@cuet.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', NOW(), NOW());"
mysql -u root -p12345678 -e "USE cuet_ecash; INSERT IGNORE INTO user_table (email, password, role, created_at, updated_at) VALUES ('mahmudul@cuet.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'STUDENT', NOW(), NOW());"
mysql -u root -p12345678 -e "USE cuet_ecash; INSERT IGNORE INTO user_table (email, password, role, created_at, updated_at) VALUES ('hall.officer@cuet.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'HALL_OFFICER', NOW(), NOW());"
mysql -u root -p12345678 -e "USE cuet_ecash; INSERT IGNORE INTO user_table (email, password, role, created_at, updated_at) VALUES ('dept.officer@cuet.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'OFFICER', NOW(), NOW());"
echo Demo users added successfully!
pause 