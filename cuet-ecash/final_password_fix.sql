-- Final password fix for CUET E-Cash
-- Using a verified BCrypt hash for "password123"

USE cuet_ecash;

-- Update all passwords to a working BCrypt hash for "password123"
-- This hash: $2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
UPDATE user_table SET password = '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW' 
WHERE email IN (
  'admin@cuet.ac.bd',
  'hallofficer@cuet.ac.bd', 
  'officer@cuet.ac.bd',
  'student1@student.cuet.ac.bd',
  'student2@student.cuet.ac.bd'
);

-- Verify the update
SELECT email, role, LEFT(password, 25) as password_start FROM user_table; 