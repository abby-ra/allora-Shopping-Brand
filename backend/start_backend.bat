@echo off
REM Allora Boutique - Backend Setup and Run Script

echo ================================
echo Allora Boutique - Backend Setup
echo ================================
echo.

cd /d "%~dp0"

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo Error: Failed to create virtual environment
        echo Make sure Python is installed and in PATH
        pause
        exit /b 1
    )
    echo Virtual environment created successfully!
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Check if requirements are installed
if not exist "venv\Lib\site-packages\flask\" (
    echo Installing Python dependencies...
    echo This may take several minutes on first run...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
)

REM Create uploads directory
if not exist "uploads\" (
    mkdir uploads
)

echo.
echo ================================
echo Starting Flask Server...
echo ================================
echo.
echo API will be available at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

python app.py

pause
