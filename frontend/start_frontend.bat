@echo off
REM Allora Boutique - Frontend Setup and Run Script

echo ================================
echo Allora Boutique - Frontend Setup
echo ================================
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing Node.js dependencies...
    echo This may take several minutes on first run...
    call npm install
    if errorlevel 1 (
        echo Error: Failed to install dependencies
        echo Make sure Node.js and npm are installed
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
)

echo.
echo ================================
echo Starting React Development Server...
echo ================================
echo.
echo Website will open at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm start

pause
