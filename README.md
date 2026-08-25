# 📰 NewsCraft — Personalized News Aggregator

**NewsCraft** is a full-stack, newspaper-style news aggregation platform that allows users to discover and explore news from around the world with **country and category-based filtering**, while also providing **secure user authentication, personal notes, and interactive features**.

The application is built with a modern **React frontend** and **Spring Boot backend**, uses **MongoDB Atlas** for persistence, integrates with **NewsAPI**, and is containerized using **Docker and Docker Compose**.

## 🌐 Live Demo

🚀 **[NewsCraft — Live Application](https://news-craft-sigma.vercel.app/)**

**Frontend:** Vercel
**Backend:** Render
**Database:** MongoDB Atlas

---

## ✨ Features

### 📰 News Aggregation

* Browse breaking and global news.
* Search news by keywords.
* Filter news by:

  * Country
  * Category
  * Topic
* Pagination for news results.
* Top-headlines support.
* Country-specific news feeds.
* NewsAPI integration through the Spring Boot backend.
* Source-aware fallback strategy for countries where direct NewsAPI country queries may return limited results.
* Cached news-source discovery to reduce unnecessary API calls.

### 🔐 Authentication & Security

* User registration and login.
* JWT-based authentication.
* Password hashing using BCrypt.
* Spring Security integration.
* Protected user-specific APIs.
* Secure logout flow.
* Authenticated users can access their own personal data.

### 📝 Personal Notes

* Create personal notes.
* View user-owned notes.
* Update and delete notes.
* Notes are associated with authenticated users.
* Users cannot access another user's notes.

### 🧩 Interactive Features

* Puzzle/interactive section.
* Responsive newspaper-style interface.
* Category and country navigation.
* User profile/authentication experience.

### 🎨 UI / UX

* Responsive design.
* Modern newspaper-inspired interface.
* Tailwind CSS styling.
* Clean editorial layout.
* Desktop and mobile-friendly experience.
* React Router based navigation.

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────────┐
                    │        User             │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   React + Vite Frontend │
                    │      Tailwind CSS       │
                    └────────────┬────────────┘
                                 │
                          REST API / JWT
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Spring Boot Backend   │
                    │                         │
                    │  Controllers            │
                    │  Services               │
                    │  Spring Security        │
                    │  JWT Authentication     │
                    └───────┬─────────┬───────┘
                            │         │
                  ┌─────────┘         └──────────┐
                  ▼                              ▼
        ┌──────────────────┐           ┌──────────────────┐
        │   MongoDB Atlas  │           │     NewsAPI      │
        │                  │           │                  │
        │ Users / Notes    │           │ News Sources     │
        └──────────────────┘           └──────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* **React.js**
* **Vite**
* **Tailwind CSS**
* **Axios**
* **React Router**
* JavaScript / ES6+

## Backend

* **Java 21**
* **Spring Boot**
* **Spring MVC**
* **Spring Security**
* **JWT Authentication**
* **Spring Data MongoDB**
* **Maven**
* REST APIs

## Database

* **MongoDB**
* **MongoDB Atlas**

## APIs & Security

* **NewsAPI**
* JWT
* BCrypt
* CORS
* RESTful APIs

## DevOps & Deployment

* **Docker**
* **Docker Compose**
* **Nginx**
* **Vercel**
* **Render**
* Git / GitHub

---

# 📂 Project Structure

```text
NewsCraft/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── newscraft/
│   │       │           ├── controller/
│   │       │           ├── service/
│   │       │           ├── repository/
│   │       │           ├── model/
│   │       │           ├── dto/
│   │       │           ├── security/
│   │       │           └── config/
│   │       │
│   │       └── resources/
│   │           └── application.yml
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   └── pom.xml
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── auth/
│   │   └── ...
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vercel.json
│   └── package.json
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

# 🔌 Important API Endpoints

### News

```http
GET /api/news
```

Example:

```http
GET /api/news?query=world&page=1&pageSize=12
```

### All News

```http
GET /all-news
```

### Top Headlines

```http
GET /top-headlines
```

### Country News

```http
GET /country/{iso}
```

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Health Check

```http
GET /health
```

> Endpoint names may vary depending on the current backend controller configuration.

---

# 📰 NewsAPI Integration

NewsCraft uses **NewsAPI** as the external news provider.

The backend does not simply expose the external API directly to the frontend. Instead, the Spring Boot backend handles news retrieval and provides a controlled API for the React application.

A source-aware fallback strategy was implemented to handle cases where a direct country-based NewsAPI request may return no articles.

The flow is approximately:

```text
Frontend
   │
   ▼
Spring Boot /api/news
   │
   ▼
Try country/category query
   │
   ├── Articles found ──────► Return results
   │
   └── No articles
           │
           ▼
     Discover available sources
           │
           ▼
     Request news using sources
           │
           ▼
       Return results
```

A cache is used for source discovery to reduce repeated external API requests.

---

# 🔐 Authentication Flow

NewsCraft uses **JWT-based authentication with Spring Security**.

```text
User
 │
 ▼
Login
 │
 ▼
Spring Security
 │
 ▼
Credentials Validation
 │
 ▼
JWT Generated
 │
 ▼
Frontend stores authentication state
 │
 ▼
JWT sent with protected requests
 │
 ▼
JWT Authentication Filter
 │
 ▼
Protected Controller
```

Passwords are never stored as plain text. They are securely hashed using **BCrypt**.

---

# 🐳 Docker Setup

NewsCraft is containerized for production-style local development.

Docker Compose runs the frontend and backend as separate services.

```text
                 Docker Compose
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
 ┌─────────────────┐       ┌─────────────────┐
 │ Frontend        │       │ Backend         │
 │ React + Vite    │       │ Spring Boot     │
 │ Nginx           │       │ Java 21         │
 └─────────────────┘       └────────┬────────┘
                                    │
                                    ▼
                              MongoDB Atlas
```

MongoDB is not run as a Docker container. The application connects to MongoDB Atlas through `MONGODB_URI`.

### Build containers

```bash
docker compose build
```

### Start application

```bash
docker compose up
```

Then open:

```text
http://localhost:3000
```

### Stop containers

```bash
docker compose down
```

---

# 🚀 Local Development

## 1. Clone the repository

```bash
git clone https://github.com/prachimehar/NewsCraft.git
cd NewsCraft
```

## 2. Configure environment variables

Create your environment configuration from:

```text
.env.example
```

Never commit real secrets such as:

* MongoDB credentials
* JWT secrets
* NewsAPI keys

---

## 3. Start Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## 4. Start Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# ⚙️ Environment Variables

## Backend

```env
MONGODB_URI=your_mongodb_connection_string

NEWS_API_KEY=your_newsapi_key
NEWS_API_BASE_URL=https://newsapi.org
NEWS_API_TIMEOUT=5s

JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=86400000

CORS_ALLOWED_ORIGINS=http://localhost:5173

PORT=8080
```

## Frontend

```env
VITE_API_BASE_URL=http://localhost:8080
```

For production:

```env
VITE_API_BASE_URL=https://newscraft.onrender.com
```

> Never commit `.env` files containing real credentials.

---

# ☁️ Production Deployment

## Frontend — Vercel

The React frontend is deployed on Vercel.

Production URL:

**https://news-craft-sigma.vercel.app/**

Configure:

```env
VITE_API_BASE_URL=https://newscraft.onrender.com
```

React Router fallback configuration is included for production navigation and refresh handling.

---

## Backend — Render

The Spring Boot backend is deployed on Render using Docker.

The backend:

* Uses Java 21.
* Builds through Maven inside Docker.
* Runs using Eclipse Temurin JRE.
* Binds to Render's `PORT` environment variable.
* Uses MongoDB Atlas.
* Exposes REST APIs.
* Provides a health endpoint for deployment monitoring.

Production backend:

```text
https://newscraft.onrender.com
```

---

# 🗄️ MongoDB Atlas

MongoDB Atlas is used as the production database.

The application receives the MongoDB connection string through:

```env
MONGODB_URI
```

Example format:

```text
mongodb+srv://<username>:<password>@<cluster>/<database>
```

Credentials are stored only in environment variables and are not committed to GitHub.

---

# 🔒 Security Considerations

NewsCraft follows several basic security practices:

* JWT-based authentication.
* BCrypt password hashing.
* Protected backend endpoints.
* User-specific data access.
* CORS configuration.
* Environment-based secrets.
* No database credentials committed to source control.
* No API keys hardcoded into the application.
* JWT secret supplied through environment variables.

---

# 🧪 Testing the Production API

After deployment, the backend API can be tested directly:

```text
https://newscraft.onrender.com/api/news?query=world&page=1&pageSize=12
```

A successful request should return a JSON news response rather than a `404 Not Found`.

Health check:

```text
https://newscraft.onrender.com/health
```

---

# 🔄 Deployment Workflow

```text
        GitHub
           │
     git push origin main
           │
     ┌─────┴─────┐
     ▼           ▼
  Vercel       Render
     │           │
     ▼           ▼
 React Build   Docker Build
     │           │
     ▼           ▼
Frontend      Spring Boot
               │
               ▼
          MongoDB Atlas
```

---

# 💡 Key Engineering Highlights

Some of the main engineering concepts demonstrated in this project:

* Full-stack application architecture.
* REST API development with Spring Boot.
* JWT authentication and Spring Security.
* Role/user-aware data protection.
* MongoDB database integration.
* External API integration.
* API fallback strategies.
* Server-side API abstraction.
* React component-based architecture.
* Client-side routing.
* Responsive UI development.
* Docker containerization.
* Docker Compose orchestration.
* Nginx production serving.
* Environment-based configuration.
* Cloud deployment with Vercel and Render.
* MongoDB Atlas cloud database.
* Git/GitHub based deployment workflow.
