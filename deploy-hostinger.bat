@echo off
REM ============================================
REM   Caniel Agency - Hostinger Deploy Script
REM   Build and prepare for Hostinger shared hosting
REM ============================================

echo.
echo ============================================
echo   Caniel Agency - Hostinger Deploy
echo ============================================
echo.

REM Step 1: Clean previous build
echo [1/5] Cleaning previous build...
if exist "build\" (
    rmdir /s /q build
    echo Previous build cleaned.
) else (
    echo No previous build found.
)
echo.

REM Step 2: Build the project
echo [2/5] Building production bundle...
call npm run build

if not exist "build\" (
    echo.
    echo ERROR: Build failed! Check errors above.
    pause
    exit /b 1
)

echo.
echo [3/5] Build complete!
echo.

REM Step 3: Copy .htaccess to build folder
echo [4/5] Preparing deployment files...
echo Copying .htaccess to build folder...
copy /Y .htaccess build\.htaccess >nul

REM Step 4: Create deployment ZIP
echo Creating deployment ZIP...
if exist "caniel-hostinger-deploy.zip" (
    del /q caniel-hostinger-deploy.zip
)

REM Use PowerShell to create ZIP
powershell -Command "Compress-Archive -Path 'build\*' -DestinationPath 'caniel-hostinger-deploy.zip' -Force"

if not exist "caniel-hostinger-deploy.zip" (
    echo.
    echo ERROR: Failed to create deployment ZIP!
    pause
    exit /b 1
)

echo.
echo [5/5] Deployment package created!
echo.

echo ============================================
echo   DEPLOYMENT PACKAGE READY
echo ============================================
echo.
echo File: caniel-hostinger-deploy.zip
echo.
echo Upload Instructions:
echo 1. Login to Hostinger Control Panel
echo 2. Go to File Manager
echo 3. Navigate to public_html folder
echo 4. Delete old files (backup first!)
echo 5. Upload caniel-hostinger-deploy.zip
echo 6. Extract the ZIP in public_html
echo 7. Visit https://caniel.my.id
echo.
echo ============================================
echo.
pause
