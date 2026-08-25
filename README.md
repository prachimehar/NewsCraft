<<<<<<< HEAD
# 📰 NewsCraft : Personalized News Aggregator 
=======

NewsCraft is a full-stack newspaper-style news application with global news browsing, category and country filters, JWT authentication, personal notes, and a puzzle section.

## Features

- Global and country-specific news feeds backed by NewsAPI.org
- Top headlines by category
- Register, login, logout, and JWT-protected notes
- User-owned notes so one user cannot access another user's notes
- Editorial cream, dark navy, and NewsCraft red visual identity
- Vercel-ready frontend and Render-ready backend
- Docker Compose setup for local production-style testing

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Java 21, Spring Boot, Spring Security, JWT, Spring Data MongoDB
- Database: MongoDB Atlas
- Deployment: Vercel for frontend, Render for backend
- Local containers: Docker, Docker Compose, Nginx

## Project Structure

```text
client/   React + Vite frontend
backend/  Spring Boot backend
docker-compose.yml
.env.example
```

## Local Development

Create environment files from `.env.example` and fill in real values locally. Do not commit real `.env` files.

Frontend:

```bash
cd client
npm install
npm run dev
```

Backend:

```bash
cd backend
mvn spring-boot:run
```

MongoDB:

- Use MongoDB Atlas or another MongoDB URI through `MONGODB_URI`.
- Include the database name in the URI.

## Docker Setup

Docker Compose runs the React production build through Nginx and proxies API requests to the backend container. It expects MongoDB Atlas through `MONGODB_URI`; it does not start a MongoDB container.

```bash
docker compose build
docker compose up
```

Open the frontend at `http://localhost:3000`.

## Production Deployment

Vercel frontend:

- Set `VITE_API_BASE_URL` to the deployed Render backend URL.
- `client/vercel.json` handles React Router refresh fallback.

Render backend:

- Deploy the Spring Boot backend from `backend`.
- Set Java 21.
- Configure all required backend environment variables.
- Use `/health` as a lightweight health endpoint.

MongoDB Atlas:

- Set `MONGODB_URI` to the Atlas connection string.
- Keep credentials in environment variables only.

## Environment Variables

Backend:

- `NEWS_API_KEY`
- `NEWS_API_BASE_URL`
- `NEWS_API_TIMEOUT`
- `MONGODB_URI`
- `CORS_ALLOWED_ORIGINS`
- `PORT`
- `JWT_SECRET`
- `JWT_EXPIRATION`

Frontend:

- `VITE_API_BASE_URL`
