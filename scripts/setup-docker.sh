#!/bin/bash
# Car Rental Platform - Docker Setup Script
# This script sets up the complete development environment

set -e

echo "🚗 Car Rental Platform - Docker Setup"
echo "======================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker is installed"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please review and update the configuration."
else
    echo "✅ .env file already exists"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/shared/uploads
mkdir -p frontend/public/uploads
mkdir -p logs
echo "✅ Directories created"

# Build and start services
echo "🏗️  Building Docker images..."
cd docker
docker-compose build

echo "🚀 Starting development environment..."
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
services=("3001" "3002" "3003" "3004" "3005" "3006")
for port in "${services[@]}"; do
    if curl -f http://localhost:$port/health &> /dev/null; then
        echo "✅ Service on port $port is healthy"
    else
        echo "⚠️  Service on port $port is not responding (this is normal on first startup)"
    fi
done

# Check MongoDB
if docker exec car-rental-mongodb mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
    echo "✅ MongoDB is ready"
else
    echo "⚠️  MongoDB is still starting up"
fi

# Check Redis
if docker exec car-rental-redis redis-cli ping &> /dev/null; then
    echo "✅ Redis is ready"
else
    echo "⚠️  Redis is still starting up"
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "🌐 Access your application:"
echo "   Frontend:    http://localhost:3000"
echo "   Auth API:    http://localhost:3001"
echo "   Agency API:  http://localhost:3002"
echo "   Search API:  http://localhost:3003"
echo "   Booking API: http://localhost:3004"
echo "   Payment API: http://localhost:3005"
echo "   Review API:  http://localhost:3006"
echo ""
echo "📊 Database access:"
echo "   MongoDB:     localhost:27017"
echo "   Database:    car_rental_platform"
echo "   Username:    admin"
echo "   Password:    devpassword123"
echo ""
echo "🔧 Useful commands:"
echo "   View logs:   docker-compose logs"
echo "   Stop all:    docker-compose down"
echo "   Restart:     docker-compose restart"
echo "   Clean up:    npm run docker:clean"
echo ""
echo "📚 Documentation:"
echo "   See docker/README.md for detailed instructions"
echo ""
echo "Happy coding! 🚗💨"