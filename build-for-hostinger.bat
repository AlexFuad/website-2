@echo off
REM ============================================
REM   Caniel Agency - Quick Build Script
REM   Just build the project for deployment
REM ============================================

echo.
echo ============================================
echo   Caniel Agency - Build for Deployment
echo ============================================
echo.

REM Clean previous build
echo [1/3] Cleaning previous build...
if exist "build\" (
    rmdir /s /q build
    echo Previous build cleaned.
)
echo.

REM Build the project
echo [2/3] Building production bundle...
call npm run build

if not exist "build\" (
    echo.
    echo ERROR: Build failed! Check errors above.
    pause
    exit /b 1
)

echo.

REM Copy .htaccess to build folder
echo [3/3] Copying .htaccess to build folder...
copy /Y .htaccess build\.htaccess >nul

echo.
echo ============================================
echo   BUILD COMPLETE
echo ============================================
echo.
echo The production build is ready in the 'build' folder.
echo You can now upload the contents to Hostinger.
echo.
echo Quick Upload Steps:
echo 1. Login to Hostinger File Manager
echo 2. Go to public_html
echo 3. Upload ALL files from 'build' folder
echo 4. Make sure .htaccess is included
echo.
echo ============================================
echo.
pause
