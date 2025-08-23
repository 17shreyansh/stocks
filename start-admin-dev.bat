@echo off
echo 🚀 Starting Admin Development Environment...
echo.

echo 📦 Installing dependencies...
cd backend
call npm install
echo 🔧 Fixing database structure...
node fix-admin.js
cd ../fe
call npm install
cd ..

echo.
echo 🔧 Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo 🎨 Starting Frontend Development Server...
start "Frontend Server" cmd /k "cd fe && npm run dev"

echo.
echo ✅ Development servers are starting...
echo 🌐 Backend: http://localhost:5000
echo 🎯 Frontend: http://localhost:5173
echo 🔐 Admin Panel: http://localhost:5173/admin
echo.
echo Press any key to test the homepage API...
pause > nul

echo.
echo 🧪 Testing Homepage API...
node test-homepage.js

echo.
echo 🎉 Setup complete! Check the browser windows.
pause