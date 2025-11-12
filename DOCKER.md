# Docker Build and Deployment Guide

This guide explains how to build, publish, and run the Anxiety Aid Tools application using Docker.

## Prerequisites

- **Docker installed**: You need Docker Desktop for Windows (with WSL2 backend) or Docker installed in your WSL Ubuntu environment
- **Docker Hub account**: You need a login at [hub.docker.com](https://hub.docker.com)
- **No npm required**: Docker will handle all npm operations inside the container during the build process

### Verify Docker Installation

```bash
docker --version
docker-compose --version
```

If these commands work, you're ready to proceed.

## Building the Docker Image

### 1. Build the Image

From the project root directory, run:

```bash
docker build -t amitbahree/anxiety-aid-tools:latest .
```

This will:
- Create a multi-stage build (builder + runner)
- Install dependencies and build the Nuxt application
- Create an optimized production image

### 2. Tag with Version (Optional)

You can also tag with a specific version:

```bash
docker build -t amitbahree/anxiety-aid-tools:v2.1.0 .
docker tag amitbahree/anxiety-aid-tools:v2.1.0 amitbahree/anxiety-aid-tools:latest
```

## Publishing to Docker Hub

### 1. Login to Docker Hub

```bash
docker login
```

Enter your Docker Hub username and password when prompted.

### 2. Push the Image

Push the image to Docker Hub:

```bash
docker push amitbahree/anxiety-aid-tools:latest
```

If you tagged with a version:

```bash
docker push amitbahree/anxiety-aid-tools:v2.1.0
docker push amitbahree/anxiety-aid-tools:latest
```

## Running Locally

### Using Docker Compose

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Using Docker Run

```bash
docker run -d -p 3000:3000 --name anxiety-aid-tools amitbahree/anxiety-aid-tools:latest
```

### View Logs

```bash
# With docker-compose
docker-compose logs -f

# With docker run
docker logs -f anxiety-aid-tools
```

### Stop the Container

```bash
# With docker-compose
docker-compose down

# With docker run
docker stop anxiety-aid-tools
docker rm anxiety-aid-tools
```

## Running on Remote Server

### 1. SSH into Your Remote Server

```bash
ssh user@your-server-ip
```

### 2. Install Docker (if not already installed)

For Ubuntu/Debian:

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

### 3. Login to Docker Hub on Remote Server

```bash
docker login
```

### 4. Pull and Run the Image

**Option A: Using Docker Compose**

1. Create a `docker-compose.yml` file on your server:

```yaml
version: '3.9'
services:
    anxiety-aid-tools:
        image: 'amitbahree/anxiety-aid-tools:latest'
        ports:
            - '3000:3000'
        restart: unless-stopped
```

2. Run it:

```bash
docker-compose up -d
```

**Option B: Using Docker Run**

```bash
docker pull amitbahree/anxiety-aid-tools:latest
docker run -d -p 3000:3000 --name anxiety-aid-tools --restart unless-stopped amitbahree/anxiety-aid-tools:latest
```

### 5. Configure Reverse Proxy (Optional)

If you want to use a domain name, configure Nginx or another reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. Update the Image

When you push a new version:

```bash
# Pull the latest image
docker-compose pull

# Restart with the new image
docker-compose up -d

# Or with docker run
docker pull amitbahree/anxiety-aid-tools:latest
docker stop anxiety-aid-tools
docker rm anxiety-aid-tools
docker run -d -p 3000:3000 --name anxiety-aid-tools --restart unless-stopped amitbahree/anxiety-aid-tools:latest
```

## Troubleshooting

### Build Fails

- Ensure you're in the project root directory
- Check that all files are present (package.json, etc.)
- Try building with `--no-cache`: `docker build --no-cache -t amitbahree/anxiety-aid-tools:latest .`

### Container Won't Start

- Check logs: `docker logs anxiety-aid-tools`
- Verify port 3000 is not already in use
- Ensure the build completed successfully

### Permission Issues (Linux/WSL)

If you get permission errors, you may need to add your user to the docker group:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

## Image Details

- **Base Image**: `node:lts-alpine` (lightweight Alpine Linux)
- **Port**: 3000 (Nuxt default)
- **Environment**: Production (`NODE_ENV=production`)
- **Multi-stage Build**: Optimized for smaller final image size

