@echo off
echo === Testing Direct Authentication ===
echo.
echo 1. Checking user in database:
mysql -u root -p12345678 -e "USE cuet_ecash; SELECT email, role, password FROM user_table WHERE email='admin@cuet.ac.bd';"
echo.
echo 2. Testing login without role in request:
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\"}"
echo.
echo.
echo 3. Testing with role ADMIN:
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\",\"role\":\"ADMIN\"}"
echo.
pause 