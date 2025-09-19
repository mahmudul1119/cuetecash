-- Simple password fix - use plaintext temporarily for testing
USE cuet_ecash;

-- First, let's just verify what we have
SELECT email, role FROM user_table;

-- Update with a simple known working BCrypt hash for "password123"
-- This is generated using online BCrypt generator with rounds=10
UPDATE user_table SET password = '$2y$10$eImiTXuWiQKvCUL7SfsL2OKl6w8XG0pAWZLXD/HGnXH5RfJR6v4Fu' 
WHERE email = 'admin@cuet.ac.bd';

-- Verify the update
SELECT email, role, LEFT(password, 30) as password_hash FROM user_table WHERE email = 'admin@cuet.ac.bd'; 