@echo off
echo Updating payment table schema...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "USE cuet_ecash; ALTER TABLE payment MODIFY COLUMN payment_status ENUM('PENDING', 'APPROVED', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING';"
echo Schema update completed.
pause