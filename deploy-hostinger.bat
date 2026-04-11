@echo off
REM ============================================
REM   Caniel Agency - Hostinger Deploy Script
REM   Build and prepare for Hostinger hosting
REM ============================================

echo.
echo ============================================
echo   Caniel Agency - Hostinger Deploy
echo ============================================
echo.

REM Step 1: Build the project
echo [1/4] Building production bundle...
call npm run build

if not exist "build\" (
    echo.
    echo ERROR: Build failed! Check errors above.
    pause
    exit /b 1
)

echo.
echo [2/4] Build complete!
echo.

REM Step 2: Create/update hostinger branch
echo [3/4] Preparing hostinger branch...

REM Check if hostinger branch exists locally
git branch --list hostinger | find "hostinger" >nul
if %errorlevel% equ 0 (
    echo Hostinger branch exists, updating...
) else (
    echo Creating hostinger branch...
    git branch hostinger
)

REM Checkout hostinger branch
git checkout hostinger

REM Add build files
echo Adding build files to hostinger branch...
git add -f build/
git add .htaccess

REM Commit if there are changes
git diff --cached --quiet
if %errorlevel% neq 0 (
    git commit -m "Update build files for Hostinger deployment - %date% %time%"
    echo.
    echo Commit successful!
) else (
    echo.
    echo No changes to commit. Build is up to date.
)

REM Step 3: Push to remote
echo.
echo [4/4] Pushing to remote hostinger branch...
git push origin hostinger

REM Switch back to master
git checkout master

echo.
echo ============================================
echo   DEPLOYMENT COMPLETE
echo ============================================
echo.
echo The build files have been pushed to the 'hostinger' branch.
echo.
echo Next steps in Hostinger:
echo 1. Go to Websites ^> Your Website
echo 2. Connect to GitHub: https://github.com/AlexFuad/website-2.git
echo 3. Select branch: 'hostinger' (NOT 'master')
echo 4. Set deployment path to: /build/
echo.
echo ============================================
echo.
pause
