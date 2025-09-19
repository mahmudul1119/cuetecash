@echo off
echo Testing what password works with the existing hash...
echo.
echo Testing admin@cuet.ac.bd with password "password123":
curl -X POST http://localhost:5454/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"password123\",\"role\":\"ADMIN\"}" -s
echo.
echo.
echo Testing admin@cuet.ac.bd with password "123123":
curl -X POST http://localhost:5454/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"123123\",\"role\":\"ADMIN\"}" -s
echo.
echo.
echo Testing admin@cuet.ac.bd with password "admin":
curl -X POST http://localhost:5454/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"admin\",\"role\":\"ADMIN\"}" -s
echo.
echo.
echo Testing admin@cuet.ac.bd with password "cuet":
curl -X POST http://localhost:5454/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@cuet.ac.bd\",\"password\":\"cuet\",\"role\":\"ADMIN\"}" -s
echo.
pause 