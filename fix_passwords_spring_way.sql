USE cuet_ecash;

-- Update all users with a fresh Spring-generated BCrypt hash for "123123"
-- This hash was generated using Spring's BCryptPasswordEncoder
UPDATE user_table SET password = '$2a$10$EblZqNptyYdQfSH/WT1Q6OSokGCdHZPYGO0XN2V6LmqjAaHEhhK0K' WHERE email = 'admin@cuet.ac.bd';
UPDATE user_table SET password = '$2a$10$EblZqNptyYdQfSH/WT1Q6OSokGCdHZPYGO0XN2V6LmqjAaHEhhK0K' WHERE email = 'admin@cuet.edu';
UPDATE user_table SET password = '$2a$10$EblZqNptyYdQfSH/WT1Q6OSokGCdHZPYGO0XN2V6LmqjAaHEhhK0K' WHERE email = 'mahmudul@cuet.edu';
UPDATE user_table SET password = '$2a$10$EblZqNptyYdQfSH/WT1Q6OSokGCdHZPYGO0XN2V6LmqjAaHEhhK0K' WHERE email = 'hall.officer@cuet.edu';
UPDATE user_table SET password = '$2a$10$EblZqNptyYdQfSH/WT1Q6OSokGCdHZPYGO0XN2V6LmqjAaHEhhK0K' WHERE email = 'dept.officer@cuet.edu';
UPDATE user_table SET password = '$2a$10$EblZqNptyYdQfSH/WT1Q6OSokGCdHZPYGO0XN2V6LmqjAaHEhhK0K' WHERE email = 'hallofficer@cuet.ac.bd';
UPDATE user_table SET password = '$2a$10$EblZqNptyYdQfSH/WT1Q6OSokGCdHZPYGO0XN2V6LmqjAaHEhhK0K' WHERE email = 'officer@cuet.ac.bd';
UPDATE user_table SET password = '$2a$10$EblZqNptyYdQfSH/WT1Q6OSokGCdHZPYGO0XN2V6LmqjAaHEhhK0K' WHERE email LIKE 'student%@student.cuet.ac.bd'; 