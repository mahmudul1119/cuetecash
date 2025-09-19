-- Update all user passwords to BCrypt hash of 'password123'
-- Hash generated: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi (password123)

USE cuet_ecash;

UPDATE user_table SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
WHERE email IN (
  'admin@cuet.ac.bd',
  'hallofficer@cuet.ac.bd', 
  'officer@cuet.ac.bd',
  'student1@student.cuet.ac.bd',
  'student2@student.cuet.ac.bd'
);

-- Verify update
SELECT email, LEFT(password, 30) as password_hash FROM user_table; 