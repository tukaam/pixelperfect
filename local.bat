@echo off
echo Checking for node_modules...
if not exist "node_modules\" (
    echo node_modules not found. Installing dependencies...
    npm install
)

echo.
echo Starting PixelPerfect Development Server...
echo The site will open at http://localhost:3000
echo Press Ctrl+C to stop the server.
echo.

start http://localhost:3000
npm run dev
pause
