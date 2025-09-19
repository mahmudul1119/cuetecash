@echo off
echo Testing login with updated password...
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\",\"role\":\"ADMIN\"}"
echo.
echo.
echo Also testing basic health:
curl http://localhost:5454/
pause 