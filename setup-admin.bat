@echo off
echo Setting up Admin Portal Connection...

echo.
echo 1. Setting up database...
cd backend
call npm run connect-db

echo.
echo 2. Starting backend server...
start "Backend Server" cmd /k "npm run dev"

echo.
echo 3. Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo 4. Testing connection...
cd ..
node test-admin-connection.js

echo.
echo 5. Starting frontend...
cd fe
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ Admin Portal Setup Complete!
echo.
echo Access URLs:
echo - Admin Portal: http://localhost:5173/admin
echo - Backend API: http://localhost:5000/api
echo.
echo Default Login:
echo Username: admin
echo Password: admin123
echo.
pause