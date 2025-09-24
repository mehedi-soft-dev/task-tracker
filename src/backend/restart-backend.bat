@echo off
echo Stopping backend API on port 2900...

REM Find and kill process on port 2900
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :2900 ^| findstr LISTENING') do (
    echo Killing process %%a
    taskkill /PID %%a /F 2>nul
)

echo Waiting for port to be released...
timeout /t 2 /nobreak >nul

echo Starting backend API...
cd TaskTrackerApi\TaskTrackerApi
dotnet run

pause