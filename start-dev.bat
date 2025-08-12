@echo off
echo Starting Stock Broker Development Environment...

echo.
echo Starting MongoDB (make sure MongoDB is installed and running)
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend" cmd /k "cd fe && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin
echo.
echo Default admin credentials:
echo Username: admin
echo Password: admin123
echo.
pause