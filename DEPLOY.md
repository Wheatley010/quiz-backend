# Deployment Guide

This file describes quick deploy steps for Render, Railway and Heroku, and how to set environment variables.

## 1) Prepare repository
- Ensure the project is pushed to GitHub (`main` branch).
- Ensure `.env.example` is filled and you have production values ready.

## 2) Environment variables (required)
Set the following env variables in your deployment service:
- `PORT` (optional; Render/Railway provide their own)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secure random secret
- `SENDGRID_API_KEY` — (optional) for emails
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_USERNAME` — used for initial admin creation

## 3) Render (recommended)
1. Create a new Web Service on https://render.com.
2. Connect your GitHub repository and choose the `main` branch.
3. Build Command: `npm install && npm run build` (if you have a build step). If no build, leave blank.
4. Start Command: `node src/server.js` (or `npm start` if configured).
5. Add the environment variables from section 2.
6. Create the service and deploy.

Render will provide a public URL (use it in README and submission).

## 4) Railway
1. Create a new project on https://railway.app and link your GitHub repo.
2. Set the Environment Variables under Project Settings.
3. Set Start Command: `node src/server.js`.
4. Deploy and note the generated URL.

## 5) Heroku (Docker or Node)
- If using Heroku GitHub integration: set `Procfile` (already included) and set env vars in Heroku dashboard.
- If using Docker: push the Docker image and release.

## 6) Testing after deploy
- Visit `<YOUR_DEPLOY_URL>/` to confirm server response.
- Visit `<YOUR_DEPLOY_URL>/frontend/login.html` for frontend.
- Test register/login and create a quiz to ensure DB connection works.

## 7) Add deployed URL to `README.md`
After successful deploy, add the public URL under the **Развертывание** section in `README.md`.

---

If you want, I can:
- attempt to set the `origin` remote and push the repo here, or
- try to push and create a GitHub repo for you (requires your confirmation), or
- walk through Render setup step-by-step and fill env vars once repo is available.
