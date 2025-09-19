@echo off
echo Testing known working admin credentials...
echo.
echo Testing admin@cuet.ac.bd with password password123:
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\",\"role\":\"ADMIN\"}" ^
  -s
echo.
pause 