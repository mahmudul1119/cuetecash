@echo off
echo Testing backend health...
curl -v http://localhost:5454/
echo.
echo.
echo Testing login endpoint with verbose output...
curl -v -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\",\"role\":\"ADMIN\"}"
pause 