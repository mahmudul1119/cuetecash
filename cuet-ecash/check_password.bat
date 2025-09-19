@echo off
mysql -u root -p12345678 -e "USE cuet_ecash; SELECT email, LEFT(password, 20) as password_start FROM user_table WHERE email='admin@cuet.ac.bd';"
pause 