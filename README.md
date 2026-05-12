# Splitscreen

Splitscreen is a full-stack social gaming web application for discovering games, tracking play activity, sharing reviews, and managing a network of friends.

The repository includes the final production-ready implementation under `Final/`, with archived milestone and proposal artifacts retained for reference.

## Project overview

- Full-stack app using Node.js, Express, and MariaDB
- Progressive Web App support with offline caching and installability
- JWT authentication, user profiles, friend management, favorites, reviews, and activity tracking
- Docker Compose deployment for local development and testing

## Repository structure

- `Final/` — main application source and deployment configuration
  - `api/` — backend API server
  - `frontend/` — frontend web server and static assets
  - `database/` — database schema and runtime storage
  - `proxy/` — Nginx reverse proxy configuration
- `Milestone1/`, `Milestone2/`, `Proposal/` — archived coursework artifacts

## Getting started

1. Copy `Final/.env.template` to `Final/.env` and populate the required values.
2. From the `Final/` directory run:
   ```bash
   docker compose up --build
   ```
3. Open the app in your browser at `http://localhost`.

## Notes

- `Final/database/data/` is ignored by git and is used for local MariaDB storage.
- The final project files are in `Final/`; milestone directories are preserved for historical reference only.
