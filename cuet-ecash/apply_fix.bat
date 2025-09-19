@echo off
echo Applying final password fix...
mysql -u root -p12345678 < final_password_fix.sql
echo.
echo Password fix applied! All accounts now use password: password123
echo.
echo Try logging in at: http://localhost:5173
echo Email: admin@cuet.ac.bd
echo Password: password123
echo Role: Admin
pause 