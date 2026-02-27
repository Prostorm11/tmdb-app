<h1 align="center">TMDB Explorer</h1>

<p align="center">
Full-Stack Movie and TV Explorer built with Symfony, React and Docker
</p>

---

<h2 align="center">
<a href="#english">English</a> |
<a href="#français">Français</a>
</h2>

---

# English

## TMDB Explorer — Symfony + React + Docker

TMDB Explorer is a small full-stack web application that consumes the TMDB API and displays:

- Top Rated Movies
- Top Rated TV Series
- Detailed media information pages

---

## Important Note

Wait for the backend server to fully start before opening the frontend.

The frontend depends on backend availability to retrieve movie and TV ratings.

---

## Tech Stack

### Backend
- Symfony 7
- PHP 8.3
- TMDB REST API
- Docker

### Frontend
- React
- TypeScript
- Vite
- React Router

### DevOps
- Docker
- Docker Compose
- Environment variables management

---

## Project Architecture

```
tmdb-app/
│
├── backend/        Symfony API
│   └── app/
│
├── frontend/       React + TypeScript application
│
├── docker-compose.yml
├── README.md
└── .env.example
```

---

## Features

- Fetch Top Rated Movies
- Fetch Top Rated TV Series
- Movie Details Page
- TV Series Details Page
- Backend API abstraction
- Secure TMDB API key handling
- Dockerized full stack
- One-command startup
- CORS enabled for frontend integration

---

## Environment Variables

Create a `.env` file in the project root:

```
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
```

You can obtain an API key from:

https://developer.themoviedb.org/reference/getting-started

Do not commit real API keys.

---

## Running the Project

### Clone repository

```
git clone https://github.com/<your-username>/tmdb-app.git
cd tmdb-app
```

### Start application

```
docker compose up --build
```

Docker will automatically:

- Build Symfony backend
- Install Composer dependencies
- Build React frontend
- Install npm dependencies
- Start both services

---

## Application URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |

---

## Backend API Endpoints

### Top Rated Movies

```
GET /api/movies/top-rated
```

### Top Rated TV Series

```
GET /api/tv/top-rated
```

### Movie Details

```
GET /api/movies/{id}
```

### TV Details

```
GET /api/tv/{id}
```

---

## Architecture Overview

### Backend (Symfony)

The backend acts as a proxy layer:

```
React → Symfony API → TMDB API
```

Responsibilities:

- Secure API key storage
- External API communication
- Response normalization
- REST endpoint exposure

Main components:

- Controllers
- Services (TmdbClient)
- Environment configuration

---

### Frontend (React)

The frontend:

- Calls Symfony endpoints
- Displays movie and TV grids
- Uses client-side routing
- Provides detailed media pages

Concepts used:

- API service layer
- Reusable components
- React Router navigation

---

## Useful Commands

Stop containers:

```
docker compose down
```

Rebuild containers:

```
docker compose up --build
```

View logs:

```
docker compose logs -f
```

---

## Requirements

Only required locally:

- Docker Desktop
- Git

No PHP, Node.js or Composer installation required.

---

## Possible Improvements

- Search functionality
- Pagination
- Cast and trailers
- Favorites system
- Authentication

---

## Author

Derrick Marfo

---

# Français

## TMDB Explorer — Symfony + React + Docker

TMDB Explorer est une application web full-stack utilisant l’API TMDB permettant d’afficher :

- Les films les mieux notés
- Les séries TV les mieux notées
- Des pages détaillées pour chaque média

---

## Note Importante

Attendez que le serveur backend soit complètement démarré avant d’ouvrir le frontend.

Le frontend dépend du backend pour récupérer les informations et les notes.

---

## Technologies Utilisées

### Backend
- Symfony 7
- PHP 8.3
- API REST TMDB
- Docker

### Frontend
- React
- TypeScript
- Vite
- React Router

### DevOps
- Docker
- Docker Compose
- Gestion des variables d’environnement

---

## Architecture du Projet

```
tmdb-app/
│
├── backend/        API Symfony
├── frontend/       Application React
├── docker-compose.yml
└── .env.example
```

---

## Fonctionnalités

- Récupération des films les mieux notés
- Récupération des séries TV les mieux notées
- Page de détails des films
- Page de détails des séries
- Abstraction API côté backend
- Protection de la clé API TMDB
- Application entièrement conteneurisée
- Démarrage en une seule commande

---

## Variables d’Environnement

Créer un fichier `.env` à la racine du projet :

```
TMDB_API_KEY=votre_cle_tmdb
TMDB_BASE_URL=https://api.themoviedb.org/3
```

Ne jamais publier de vraies clés API.

---

## Lancer le Projet

Cloner le dépôt :

```
git clone https://github.com/<your-username>/tmdb-app.git
cd tmdb-app
```

Démarrer l’application :

```
docker compose up --build
```

---

## URLs de l’Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |

---

## Améliorations Possibles

- Fonction de recherche
- Pagination
- Acteurs et bandes-annonces
- Système de favoris
- Authentification

---

## Auteur

Derrick Marfo