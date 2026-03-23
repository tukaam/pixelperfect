@echo off
echo Building PixelPerfect Docker image...
docker build -t pixelperfect-app .
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Docker build failed. Make sure Docker Desktop is running.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Starting PixelPerfect on http://localhost:3000...
echo Close this window to stop the server.
echo.
docker run -p 3000:3000 pixelperfect-app
pause
