@echo off
mysql -u root -p12345678 -e "USE cuet_ecash; SELECT email, role FROM user_table; SELECT COUNT(*) as total FROM user_table;"
pause 