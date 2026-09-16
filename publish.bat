@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   creditintuition.github.io - publish
echo ============================================
echo.

git add -A

git diff --cached --quiet
if %errorlevel%==0 (
    echo Nothing new to publish. Working tree is clean.
    echo.
    pause
    exit /b 0
)

echo Changed files:
echo.
git diff --cached --name-status
echo.

set "msg="
set /p msg=Short note for this update (Enter for default):
if "%msg%"=="" set "msg=Update site content"

git commit -m "%msg%"
if errorlevel 1 (
    echo.
    echo Commit failed - see message above.
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 (
    echo.
    echo Push failed - see message above. Your commit is saved locally;
    echo fix the issue (e.g. run "git pull" if remote has new commits)
    echo and re-run this script, or just run "git push" yourself.
    pause
    exit /b 1
)

echo.
echo Done. Pushed to GitHub - creditintuition.github.io will update in
echo a minute or two.
pause
