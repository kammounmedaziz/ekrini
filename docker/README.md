# Car Rental Platform - Docker Setup

This document provides comprehensive instructions for running the Car Rental Platform using Docker containers, enabling easy development and deployment for your team.

## 🏗️ Architecture Overview

The platform consists of:
- **6 Backend Microservices** (Node.js/Express)
  - Auth & User Service (Port 3001)
  - Agency & Fleet Service (Port 3002) 
  - Search & Availability Service (Port 3003)
  - Reservation Service (Port 3004)
  - Payment & Billing Service (Port 3005)
  - Review & Support Service (Port 3006)
- **Frontend Application** (React.js - Port 3000)
- **MongoDB Database** (Port 27017)
- **Redis Cache** (Port 6379)

## 🚀 Quick Start

### Prerequisites
- Docker Desktop (4.0+)
- Docker Compose (v2.0+)
- Git
- 8GB RAM minimum

### 1. Clone and Setup
```bash
git clone <your-repository-url>
cd car-rental-platform

# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
# The default values work for development
```

### 2. Start Development Environment
```bash
# Start all services in development mode
npm run docker:dev

# Or manually:
cd docker
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### 3. Verify Installation
```bash
# Check all services are running
docker ps

# Test database connection
npm run test:connection

# Access the application
# Frontend: http://localhost:3000
# API Services: http://localhost:3001-3006
```

## 🛠️ Development Workflow

### Available Commands
```bash
# Development with hot reload
npm run docker:dev

# Build all images
npm run docker:build

# Start production mode
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs

# Clean up (remove containers, volumes, images)
npm run docker:clean
```

### Service URLs in Development
- **Frontend**: http://localhost:3000
- **Auth Service**: http://localhost:3001
- **Agency Service**: http://localhost:3002
- **Search Service**: http://localhost:3003
- **Reservation Service**: http://localhost:3004
- **Payment Service**: http://localhost:3005
- **Review Service**: http://localhost:3006
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

### Debugging Services
Each backend service exposes a debug port:
- Auth Service: 9229
- Agency Service: 9230
- Search Service: 9231
- Reservation Service: 9232
- Payment Service: 9233
- Review Service: 9234

Connect your debugger to `localhost:<debug-port>` for step-through debugging.

## 📁 File Structure
```
docker/
├── docker-compose.yml         # Main production configuration
├── docker-compose.dev.yml     # Development overrides
└── README.md                  # This file

backend/
├── auth-user-service/
│   └── Dockerfile            # Service-specific Dockerfile
├── agency-fleet-service/
│   └── Dockerfile
├── [other-services]/
│   └── Dockerfile
└── shared/                   # Shared utilities

frontend/
└── Dockerfile               # React app Dockerfile

scripts/
└── init-mongo.js           # Database initialization script
```

## 🗄️ Database Setup

### MongoDB Initialization
The MongoDB container automatically:
- Creates the `car_rental_platform` database
- Sets up collections with validation schemas
- Creates optimized indexes
- Inserts sample data for testing

### Default Credentials (Development)
- **Username**: admin
- **Password**: devpassword123 (development)
- **Database**: car_rental_platform

### Sample Data Included
- Admin user: admin@carrentalplatform.com
- Sample agency: Premium Car Rentals
- Sample vehicles: Toyota Camry, BMW X5

## 🔧 Configuration

### Environment Variables
Key environment variables (see `.env.example`):

```bash
# Database
MONGODB_URI=mongodb://admin:devpassword123@mongodb:27017/car_rental_platform?authSource=admin

# Services
REACT_APP_AUTH_SERVICE=http://localhost:3001
REACT_APP_AGENCY_SERVICE=http://localhost:3002
# ... other service URLs

# Security
JWT_SECRET=your-jwt-secret-here

# Payment Gateways
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=your_paypal_id
```

### Custom Configuration
1. **Development**: Modify `docker-compose.dev.yml`
2. **Production**: Modify `docker-compose.yml`
3. **Environment**: Update `.env` file

## 🔍 Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check what's using ports 3000-3006, 27017, 6379
netstat -an | findstr "3000 3001 3002 3003 3004 3005 3006 27017 6379"

# Stop conflicting services or change ports in docker-compose files
```

#### Database Connection Issues
```bash
# Check MongoDB logs
docker logs car-rental-mongodb

# Test connection manually
npm run test:connection

# Reset database
docker volume rm car-rental-platform_mongodb_data
docker-compose up mongodb
```

#### Service Not Starting
```bash
# Check service logs
docker logs auth-service

# Rebuild specific service
docker-compose build auth-service
docker-compose up auth-service
```

#### Memory Issues
```bash
# Check resource usage
docker stats

# Increase Docker Desktop memory limit to 8GB+
# Restart Docker Desktop
```

### Health Checks
All services include health checks accessible at:
```
GET http://localhost:<port>/health
```

### Log Management
```bash
# View all logs
docker-compose logs

# Follow logs for specific service
docker-compose logs -f auth-service

# View last 100 lines
docker-compose logs --tail=100
```

## 🚢 Production Deployment

### Production Mode
```bash
# Build production images
docker-compose build

# Start in production mode
docker-compose up -d

# Scale services (example)
docker-compose up --scale auth-service=3
```

### Environment Considerations
- Update `.env` with production values
- Use strong passwords and secrets
- Configure proper CORS origins
- Set up SSL/TLS certificates
- Configure external databases if needed

## 🧪 Testing

### Running Tests
```bash
# Test database connection
npm run test:connection

# Run service tests (when implemented)
docker-compose exec auth-service npm test
docker-compose exec agency-service npm test
```

### Load Testing
```bash
# Install artillery for load testing
npm install -g artillery

# Test auth service
artillery quick --count 10 --num 5 http://localhost:3001/health
```

## 📊 Monitoring

### Basic Monitoring
```bash
# View resource usage
docker stats

# Check service health
curl http://localhost:3001/health
curl http://localhost:3002/health
# ... check all services
```

### Production Monitoring
For production environments, consider integrating:
- Prometheus + Grafana for metrics
- ELK Stack for centralized logging
- Sentry for error tracking

## 🤝 Team Collaboration

### Sharing the Project
1. Ensure Docker Desktop is installed
2. Clone the repository
3. Run `npm run docker:dev`
4. Access http://localhost:3000

### Git Workflow
```bash
# Pull latest changes
git pull origin main

# Rebuild after pulling changes
npm run docker:build
npm run docker:up
```

### Onboarding New Team Members
1. Install Docker Desktop
2. Clone repository
3. Copy `.env.example` to `.env`
4. Run `npm run docker:dev`
5. Verify all services at http://localhost:3000

## 🔒 Security Notes

### Development Security
- Default passwords are for development only
- MongoDB runs without authentication in dev mode
- Debug ports are exposed for development

### Production Security Checklist
- [ ] Change all default passwords
- [ ] Enable MongoDB authentication
- [ ] Use environment-specific secrets
- [ ] Configure proper network security
- [ ] Enable HTTPS/SSL
- [ ] Regular security updates

## 📞 Support

### Getting Help
1. Check this README
2. Review service logs: `docker-compose logs <service-name>`
3. Check health endpoints: `curl http://localhost:<port>/health`
4. Review environment configuration in `.env`

### Common Commands Reference
```bash
# Start development environment
npm run docker:dev

# Stop all services
npm run docker:down

# View logs
npm run docker:logs

# Clean everything
npm run docker:clean

# Rebuild specific service
docker-compose build <service-name>

# Access service shell
docker-compose exec <service-name> sh
```

---

🎉 **You're ready to start developing with the Car Rental Platform!**

The complete microservices architecture is now containerized and ready for team collaboration. Each service runs independently with hot reload enabled for efficient development.