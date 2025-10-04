@echo off
REM Car Rental Platform - Docker Setup Script for Windows
REM This script sets up the complete development environment

echo 🚗 Car Rental Platform - Docker Setup
echo ======================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

echo ✅ Docker is installed

REM Check if .env file exists
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created. Please review and update the configuration.
) else (
    echo ✅ .env file already exists
)

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist "backend\shared\uploads" mkdir backend\shared\uploads
if not exist "frontend\public\uploads" mkdir frontend\public\uploads
if not exist "logs" mkdir logs
echo ✅ Directories created

REM Build and start services
echo 🏗️  Building Docker images...
cd docker
docker-compose build

echo 🚀 Starting development environment...
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check service health
echo 🔍 Checking service health...
for %%p in (3001 3002 3003 3004 3005 3006) do (
    curl -f http://localhost:%%p/health >nul 2>&1
    if !errorlevel! equ 0 (
        echo ✅ Service on port %%p is healthy
    ) else (
        echo ⚠️  Service on port %%p is not responding (this is normal on first startup)
    )
)

REM Check MongoDB
docker exec car-rental-mongodb mongosh --eval "db.adminCommand('ping')" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB is ready
) else (
    echo ⚠️  MongoDB is still starting up
)

REM Check Redis
docker exec car-rental-redis redis-cli ping >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Redis is ready
) else (
    echo ⚠️  Redis is still starting up
)

echo.
echo 🎉 Setup Complete!
echo.
echo 🌐 Access your application:
echo    Frontend:    http://localhost:3000
echo    Auth API:    http://localhost:3001
echo    Agency API:  http://localhost:3002
echo    Search API:  http://localhost:3003
echo    Booking API: http://localhost:3004
echo    Payment API: http://localhost:3005
echo    Review API:  http://localhost:3006
echo.
echo 📊 Database access:
echo    MongoDB:     localhost:27017
echo    Database:    car_rental_platform
echo    Username:    admin
echo    Password:    devpassword123
echo.
echo 🔧 Useful commands:
echo    View logs:   docker-compose logs
echo    Stop all:    docker-compose down
echo    Restart:     docker-compose restart
echo    Clean up:    npm run docker:clean
echo.
echo 📚 Documentation:
echo    See docker\README.md for detailed instructions
echo.
echo Happy coding! 🚗💨
echo.
pause