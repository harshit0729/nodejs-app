# MERN Netflix Clone — DevOps Deployment Project

## Project Overview

This project demonstrates a complete end-to-end DevOps deployment workflow for a MERN stack application using modern cloud and container technologies.

The application was containerized using Docker, automated with GitHub Actions CI/CD pipelines, stored in Docker Hub, and deployed publicly on AWS EC2 using Docker Compose and Nginx.

The goal of this project was to gain real-world hands-on experience in:

* Docker
* CI/CD Pipelines
* GitHub Actions
* AWS EC2
* Linux Server Management
* Docker Compose
* Nginx Reverse Proxy
* Cloud Deployment
* Container Networking
* DevOps Troubleshooting

---

# Tech Stack

## Frontend

* React.js
* Redux Toolkit
* React Router

## Backend

* Node.js
* Express.js

## DevOps & Cloud

* Docker
* Docker Compose
* GitHub Actions
* Docker Hub
* AWS EC2 (Ubuntu)
* Linux
* Nginx

---

# Project Architecture

```text
Local MERN Project
        ↓
GitHub Repositories
        ↓
GitHub Actions CI/CD
        ↓
Docker Hub Images
        ↓
AWS EC2 Ubuntu Instance
        ↓
Docker Compose Containers
        ↓
Live Public Application
```

---

# Features Implemented

* Separate frontend and backend repositories
* Dockerized MERN application
* Multi-container deployment using Docker Compose
* Automated CI/CD pipeline using GitHub Actions
* Docker image publishing to Docker Hub
* Public deployment on AWS EC2
* Nginx reverse proxy configuration
* Container networking
* Linux server setup and management
* Security Group configuration on AWS
* Production debugging and troubleshooting

---

# GitHub Repositories

## Backend Repository

```text
harshit0729/nodejs-app
```

## Frontend Repository

```text
harshit0729/reactjs-app
```

Used separate repositories for:

* Better DevOps practice
* Independent deployment pipelines
* Easier image management
* Better scalability

---

# Docker Hub Repositories

## Backend Image

```text
harshittjainn/node
```

## Frontend Image

```text
harshittjainn/reactjs
```

---

# CI/CD Workflow

Implemented GitHub Actions pipeline to:

1. Checkout source code
2. Build Docker images
3. Authenticate with Docker Hub
4. Push Docker images automatically

Workflow file:

```text
.github/workflows/cicd.yml
```

---

# AWS EC2 Deployment

Created Ubuntu EC2 Free Tier instance and configured:

## Opened Ports

| Port | Purpose       |
| ---- | ------------- |
| 22   | SSH Access    |
| 80   | Frontend HTTP |
| 443  | HTTPS         |
| 5000 | Backend API   |

---

# Docker Installation on EC2

```bash
sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
docker --version
```

---

# Docker Compose Setup

Used Docker Compose to manage multi-container networking.

## Final Compose File

```yaml
services:
  server:
    image: harshittjainn/node:latest
    container_name: netflix-server
    ports:
      - "5000:5000"
    restart: unless-stopped

  client:
    image: harshittjainn/reactjs:latest
    container_name: netflix-client
    ports:
      - "80:80"
    depends_on:
      - server
    restart: unless-stopped
```

---

# Major Problems Solved

## 1. Missing Build Script

### Error

```text
npm error Missing script: "build"
```

### Solution

Fixed Docker build context to point to correct folder where package.json exists.

---

## 2. Docker Hub Authentication Failure

### Error

```text
unauthorized: incorrect username or password
```

### Solution

* Generated Docker Personal Access Token
* Added GitHub Secrets correctly
* Used exact Docker Hub username

---

## 3. Docker Image Naming Issue

### Error

```text
No such image: netflix-server
```

### Solution

Used consistent Docker image names across:

* GitHub Actions
* Docker Hub
* Docker Compose

Built each image separately with correct tags.

---

## 4. Nginx Upstream Connection Problem

### Error

```text
host not found in upstream "server"
```

### Cause

Frontend and backend containers were not connected through shared Docker networking.

### Solution

Solved using Docker Compose networking.

---

# Important Concepts Learned

* Docker containerization
* Multi-container architecture
* GitHub Actions CI/CD
* Docker image management
* Docker Hub authentication
* Linux server management
* AWS EC2 deployment
* Nginx reverse proxy basics
* Container networking
* Docker Compose orchestration
* DevOps debugging workflow
* Production deployment troubleshooting

---

# Commands Practiced

## Docker Commands

```bash
docker build
docker pull
docker push
docker run
docker ps
docker logs
docker images
docker compose up -d
```

## Linux Commands

```bash
sudo apt-get update
sudo systemctl start docker
sudo systemctl enable docker
nano docker-compose.yml
```

## Git Commands

```bash
git init
git add
git commit
git push
git checkout -b
```

---

# Live Deployment

Application successfully deployed publicly on AWS EC2.

---

# Future Improvements

Planned future upgrades:

* HTTPS SSL using Certbot
* Custom Domain Setup
* MongoDB Cloud Integration
* Automatic EC2 Deployment from GitHub Actions
* Monitoring and Logging
* Nginx Production Reverse Proxy
* Kubernetes
* Terraform

---

# Resume Highlights

This project demonstrates practical hands-on experience with:

* DevOps fundamentals
* Docker and containerization
* CI/CD pipelines
* AWS cloud deployment
* Linux administration
* GitHub Actions automation
* Production debugging
* Multi-container applications
* Nginx configuration
* Cloud infrastructure setup

---

# Final Achievement

Successfully built and deployed a complete Dockerized MERN application using:

```text
GitHub + Docker + Docker Hub + GitHub Actions + AWS EC2 + Docker Compose + Nginx
```

This project reflects real-world DevOps workflow implementation and production deployment experience.