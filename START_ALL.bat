@echo off
REM Quick Start Script for Allora Boutique
REM This script starts both backend and frontend servers

echo ========================================
echo    Allora Boutique - Quick Start
echo ========================================
echo.
echo Starting Backend Server...
echo.

REM Start backend in new window
start "Allora Backend" cmd /k "cd /d "%~dp0backend" && start_backend.bat"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
echo.

REM Start frontend in new window
start "Allora Frontend" cmd /k "cd /d "%~dp0frontend" && start_frontend.bat"

echo.
echo ========================================
echo Both servers are starting...
echo.
echo Backend API: http://localhost:5000
echo Frontend Website: http://localhost:3000
echo.
echo Two new windows have been opened.
echo Close this window or press any key to exit.
echo ========================================
echo.

pause
