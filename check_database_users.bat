@echo off
echo Checking database users...
mysql -u root -p12345678 -e "USE cuet_ecash; SELECT email, role, LENGTH(password) as password_length FROM user_table;"
pause 