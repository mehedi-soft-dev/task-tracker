# Docker Implementation Tasks

## Prerequisites
- [ ] Install Docker Desktop
- [ ] Verify Docker and Docker Compose installation
- [ ] Ensure Docker daemon is running

## Backend Dockerfile
- [ ] Create Dockerfile in backend directory
- [ ] Use appropriate .NET base image (mcr.microsoft.com/dotnet/aspnet:7.0 or 8.0)
- [ ] Set up multi-stage build:
  - [ ] Build stage with SDK image
  - [ ] Runtime stage with ASP.NET image
- [ ] Configure working directory
- [ ] Copy project files (.csproj)
- [ ] Restore NuGet packages
- [ ] Copy remaining source code
- [ ] Build the application
- [ ] Set up final runtime image
- [ ] Expose port (typically 5000 or 80)
- [ ] Define entry point command

## Frontend Dockerfile
- [ ] Create Dockerfile in frontend directory
- [ ] Use Node.js base image (node:18-alpine or similar)
- [ ] Set up multi-stage build:
  - [ ] Build stage for compiling React app
  - [ ] Production stage with nginx for serving
- [ ] Configure working directory
- [ ] Copy package.json and package-lock.json
- [ ] Install dependencies
- [ ] Copy source code
- [ ] Run Relay compiler
- [ ] Build production bundle
- [ ] Set up nginx stage:
  - [ ] Use nginx:alpine image
  - [ ] Copy built files from build stage
  - [ ] Configure nginx.conf for SPA routing
- [ ] Expose port 80
- [ ] Start nginx

## PostgreSQL Configuration
- [ ] Choose official PostgreSQL image version
- [ ] Plan database initialization strategy
- [ ] Prepare init scripts if needed
- [ ] Define environment variables:
  - [ ] POSTGRES_USER
  - [ ] POSTGRES_PASSWORD
  - [ ] POSTGRES_DB

## Docker Compose Setup
- [ ] Create docker-compose.yml in project root
- [ ] Define services:
  - [ ] Backend service (.NET Core GraphQL API)
  - [ ] Frontend service (React + Relay)
  - [ ] Database service (PostgreSQL)

### Backend Service Configuration
- [ ] Set service name (e.g., 'backend', 'api')
- [ ] Configure build context and Dockerfile path
- [ ] Set container name
- [ ] Configure ports mapping (e.g., 5000:80)
- [ ] Set environment variables:
  - [ ] Connection string for PostgreSQL
  - [ ] ASPNETCORE_ENVIRONMENT
  - [ ] ASPNETCORE_URLS
- [ ] Add depends_on for database
- [ ] Configure restart policy
- [ ] Add health check

### Frontend Service Configuration
- [ ] Set service name (e.g., 'frontend', 'client')
- [ ] Configure build context and Dockerfile path
- [ ] Set container name
- [ ] Configure ports mapping (e.g., 3000:80)
- [ ] Set environment variables:
  - [ ] REACT_APP_GRAPHQL_ENDPOINT (backend URL)
- [ ] Add depends_on for backend
- [ ] Configure restart policy

### Database Service Configuration
- [ ] Set service name (e.g., 'db', 'postgres')
- [ ] Use PostgreSQL image
- [ ] Set container name
- [ ] Configure ports mapping (5432:5432)
- [ ] Set environment variables:
  - [ ] POSTGRES_USER
  - [ ] POSTGRES_PASSWORD
  - [ ] POSTGRES_DB
- [ ] Configure volume for data persistence
- [ ] Add health check
- [ ] Configure restart policy

## Networking
- [ ] Define custom network in docker-compose
- [ ] Ensure all services use the same network
- [ ] Configure service discovery using container names
- [ ] Test inter-container communication

## Volumes
- [ ] Create named volume for PostgreSQL data
- [ ] Configure volume mounting in database service
- [ ] Consider adding volumes for development hot-reload

## Environment Variables
- [ ] Create .env file for sensitive data
- [ ] Add .env to .gitignore
- [ ] Document required environment variables
- [ ] Set default values in docker-compose

## Build Optimization
- [ ] Implement .dockerignore files:
  - [ ] Backend: exclude bin, obj, .vs folders
  - [ ] Frontend: exclude node_modules, build folders
- [ ] Optimize layer caching in Dockerfiles
- [ ] Minimize image sizes using alpine variants
- [ ] Remove unnecessary files in final stages

## Database Initialization
- [ ] Create init SQL script for database schema
- [ ] Configure Entity Framework migrations:
  - [ ] Add migration running in backend startup
  - [ ] Or create separate migration container
- [ ] Handle database connection retry logic
- [ ] Ensure database is ready before backend starts

## Testing & Validation
- [ ] Build all Docker images individually
- [ ] Test docker-compose build
- [ ] Run docker-compose up
- [ ] Verify all services start successfully
- [ ] Test backend GraphQL endpoint accessibility
- [ ] Test frontend loading and API connection
- [ ] Verify database persistence
- [ ] Test container restart scenarios
- [ ] Validate inter-service communication

## Health Checks
- [ ] Implement health check endpoint in backend
- [ ] Configure health check in backend Dockerfile
- [ ] Add health check for PostgreSQL
- [ ] Configure health check timing parameters
- [ ] Test health check functionality

## Logging & Monitoring
- [ ] Configure logging for all services
- [ ] Set up log aggregation (if needed)
- [ ] Ensure logs are accessible via docker-compose logs
- [ ] Configure log rotation/limits

## Development Workflow
- [ ] Document docker-compose commands
- [ ] Create start/stop scripts
- [ ] Set up development vs production configurations
- [ ] Document database backup/restore procedures

## Production Considerations
- [ ] Remove unnecessary exposed ports
- [ ] Use secrets management for sensitive data
- [ ] Configure resource limits
- [ ] Set up proper restart policies
- [ ] Document deployment process

## Troubleshooting Preparation
- [ ] Document common issues and solutions
- [ ] Create debugging commands
- [ ] Set up container shell access instructions
- [ ] Document cleanup procedures

## Final Validation
- [ ] Clean docker environment (remove all containers/images)
- [ ] Clone repository in fresh location
- [ ] Run docker-compose up from scratch
- [ ] Verify entire application works end-to-end
- [ ] Document any required manual steps