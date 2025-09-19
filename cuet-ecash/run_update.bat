@echo off
echo Updating passwords...
mysql -u root -p12345678 < update_passwords.sql
echo Password update completed!
pause 