# NewsCraft Backend

Spring Boot API for NewsCraft. It normalizes NewsAPI.org responses, handles authentication, protects user notes with JWT, and reads production configuration from environment variables.

## Endpoints

- `GET /` backend status
- `GET /health` health check
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/news`
- `GET /all-news`
- `GET /top-headlines`
- `GET /country/{iso}`
- `/notes/**` requires a valid bearer token

## Required Environment

- `NEWS_API_KEY`
- `MONGODB_URI`
- `JWT_SECRET`

## Optional Environment

- `PORT`
- `CORS_ALLOWED_ORIGINS`
- `JWT_EXPIRATION`
- `NEWS_API_BASE_URL`
- `NEWS_API_TIMEOUT`

Keep real values in local or platform environment variables only. Do not commit `.env` files.
