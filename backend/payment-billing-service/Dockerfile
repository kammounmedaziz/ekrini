# Multi-stage Dockerfile for Node.js microservice

# Development stage
FROM node:18-alpine AS dev
WORKDIR /app

# Install development dependencies
COPY package*.json ./
RUN npm ci

# Copy shared utilities
COPY backend/shared/ ./shared/

# Copy service-specific files
COPY backend/payment-billing-service/ ./

# Install nodemon for development
RUN npm install -g nodemon

# Expose port
EXPOSE 3005

# Start with nodemon for hot reload
CMD ["nodemon", "src/app.js"]

# Production stage
FROM node:18-alpine AS prod
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy shared utilities
COPY backend/shared/ ./shared/

# Copy service-specific files
COPY backend/payment-billing-service/ ./

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 3005

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3005/health', (res) => { \
    if (res.statusCode === 200) { process.exit(0); } else { process.exit(1); } \
  }).on('error', () => { process.exit(1); });"

# Start the application
CMD ["node", "src/app.js"]