@echo off
echo Testing login API...
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\",\"role\":\"ADMIN\"}"
echo.
echo.
echo Testing basic endpoint...
curl http://localhost:5454/
pause 