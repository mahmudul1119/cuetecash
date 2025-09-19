@echo off
echo Testing frontend demo credentials...
echo.
echo Testing admin@cuet.edu with password 123123:
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.edu\",\"password\":\"123123\",\"role\":\"ADMIN\"}" ^
  -s
echo.
echo.
echo Testing mahmudul@cuet.edu with password 123123:
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"mahmudul@cuet.edu\",\"password\":\"123123\",\"role\":\"STUDENT\"}" ^
  -s
echo.
echo.
echo Testing admin@cuet.ac.bd with password password123:
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\",\"role\":\"ADMIN\"}" ^
  -s
pause 