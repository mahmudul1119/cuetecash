@echo off
echo Testing exact frontend login request...
echo.
echo Testing with admin@cuet.ac.bd, password123, role ADMIN:
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\",\"role\":\"ADMIN\"}" ^
  -v
echo.
echo.
echo Testing with student1@student.cuet.ac.bd, password123, role STUDENT:
curl -X POST http://localhost:5454/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"student1@student.cuet.ac.bd\",\"password\":\"password123\",\"role\":\"STUDENT\"}" ^
  -v
pause 