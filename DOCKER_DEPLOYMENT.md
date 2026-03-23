# Docker Deployment Guide

This document provides instructions for deploying the **PixelPerfect** application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, for simplified management).

## Method 1: One-Click Deployment (Windows)

Simply double-click the **`docker.bat`** file in the root directory. This script will:
1. Build the Docker image.
2. Start the container on port 3000.
3. Keep the window open so you can see any logs.

---

## Method 2: Direct Docker Commands

### 1. Build the Docker Image

Run the following command from the root of the project:

```bash
docker build -t pixelperfect-app .
```

### 2. Run the Container

Start the application on port 3000:

```bash
docker run -p 3000:3000 pixelperfect-app
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Method 2: Using Docker Compose

Create a `docker-compose.yml` file in the root directory:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    restart: always
```

Then run:

```bash
docker-compose up -d
```

---

## Production Considerations

### Environment Variables
If your application requires environment variables, you can pass them using the `-e` flag or an `.env` file:

```bash
docker run -p 3000:3000 --env-file .env pixelperfect-app
```

### Resource Limits
For production, it is recommended to set resource limits:

```bash
docker run -p 3000:3000 --memory="512m" --cpus="1" pixelperfect-app
```

## Troubleshooting

- **Build Failures**: Ensure you have a clean state by deleting `node_modules` and `.next` folders if you encounter unexpected errors during the build.
- **Port Conflicts**: If port 3000 is already in use, change the mapping: `-p 8080:3000`.
- **Permission Issues**: The Dockerfile uses a non-root user (`nextjs`) for security. Ensure your persistent volumes (if any) have the correct permissions.
