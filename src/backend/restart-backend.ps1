Write-Host "Stopping backend API on port 2900..." -ForegroundColor Yellow

# Find and kill process using port 2900
$process = Get-NetTCPConnection -LocalPort 2900 -State Listen -ErrorAction SilentlyContinue
if ($process) {
    $pid = $process.OwningProcess
    Write-Host "Killing process $pid" -ForegroundColor Red
    Stop-Process -Id $pid -Force
}

Write-Host "Waiting for port to be released..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

Write-Host "Starting backend API..." -ForegroundColor Green
Set-Location "TaskTrackerApi\TaskTrackerApi"
dotnet run