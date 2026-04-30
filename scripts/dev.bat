@echo off
echo Starting UNANG Homepage Dev Mode...
echo.

start "Backend" cmd /k "cd /d %~dp0..\backend && python seed_data.py && uvicorn app.main:app --reload --port 8000"
start "Frontend" cmd /k "cd /d %~dp0..\frontend && npm run dev"

echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo Admin:    http://localhost:5173/admin/login
echo.
