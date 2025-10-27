# Full-Stack E-commerce

A full-stack e-commerce web application (MERN-style) that provides a product catalog, cart, and order flows with a simple admin panel and feedback/email integration.

This repository contains two main folders:

 - `Backend/` – Express.js API, MongoDB models, seed scripts and admin routes.
 - `Frontend/` – React + Vite single-page app, Redux for state, and UI components.

## Highlights

 - REST API for users, products, orders and admin actions.
 - Seed scripts to populate products, orders and users for local development.
 - Feedback email integration using Brevo (via API key).
 - Vite + React frontend with Redux and Tailwind (see `Frontend/`).

## Table of contents

 - [Prerequisites](#prerequisites)
 - [Quick start](#quick-start)
	 - [Backend](#backend)
	 - [Frontend](#frontend)
 - [Seeding data](#seeding-data)
 - [Environment variables](#environment-variables)
 - [Project structure](#project-structure)
 - [API overview](#api-overview)
 - [Notes & troubleshooting](#notes--troubleshooting)

## Prerequisites

 - Node.js (project expects Node v20 — see `.nvmrc` in both `Backend/` and `Frontend/`).
 - npm or yarn
 - MongoDB (local or a connection string for a hosted DB)

## Quick start

Clone the repo and open it:

```bash
git clone <this-repo-url>
cd Full-Stack-Ecommerce
```

### Backend

1. Enter the backend folder and install dependencies:

```bash
cd Backend
npm install
```

2. Create a `.env` file (see the example below) and set `MONGO_URI` and other keys.

3. Start the server in development (you can use nodemon if installed globally):

```bash
# with node directly
node server.js

# or (recommended during development) with nodemon
npx nodemon server.js
```

Notes:

 - The repository's `Backend/package.json` contains `dev` that references `index.js` in some setups; this project runs from `server.js` in `Backend/` — if you prefer, update the `package.json` scripts to use `server.js`.

### Frontend

1. Install dependencies:

```bash
cd ../Frontend
npm install
```

2. Start the dev server:

```bash
npm run dev
```

This will launch the Vite dev server (hot module replacement).

## Seeding data

Several seed scripts are included for local development in the `Backend/` folder:

 - `seedProducts.js` — inserts sample products
 - `seedOrders.js` — inserts sample orders
 - `seed.js` — seeds sample users (uses `data.js`)
 - `migrateUsers.js` — one-time helper to delete users and ensure unique email index

Run a seed script like this from the `Backend/` directory:

```bash
node seedProducts.js
node seedOrders.js
node seed.js
node migrateUsers.js
```

Some scripts are also exposed in `Backend/package.json` (for example `seed:orders`).

## Environment variables

Create a `Backend/.env` file (do not commit it). Example variables used by the backend:

```ini
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/ecommerce-db

# Admin login for admin routes
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=supersecret

# JWT secret used for admin tokens
JWT_SECRET=replace_with_a_long_random_secret

# Brevo (SMTP/API) key and admin target email for feedback
BREVO_API_KEY=your_brevo_api_key_here
ADMIN_EMAIL=admin@example.com

# Optional: PORT (default 5000)
PORT=5000
```

On the frontend side, check `Frontend/` for environment usage. Vite uses `VITE_` prefixed env variables when exposing them to client code.

## Project structure

High-level structure (only top-level, open folders for details):

 - Backend/
	 - `server.js` — main Express server
	 - `config/db.js` — MongoDB connection helper
	 - `controllers/`, `models/`, `routes/` — API layers
	 - `seedProducts.js`, `seedOrders.js`, `seed.js`, `migrateUsers.js` — data helpers
	 - `services/emailService.js` — feedback email using Brevo

 - Frontend/
	 - `src/` — React app source
	 - `package.json` — scripts: `dev`, `build`, `preview`, `lint`

## API overview (selected endpoints)

Base: http://localhost:5000 (or the `PORT` you set)

 - GET  /api/products — list products
 - GET  /api/products/:id — product details
 - POST /api/orders — create order
 - GET  /api/orders — list orders
 - POST /api/feedback — send feedback (email)
 - POST /api/admin/login — admin login (sets a httpOnly cookie)

Explore `Backend/routes/` for the full list of endpoints.

## Notes & troubleshooting

 - If you see authentication or JWT errors, ensure `JWT_SECRET` is set in `Backend/.env`.
 - If emails fail to send, confirm `BREVO_API_KEY` and `ADMIN_EMAIL` are set and valid.
 - If MongoDB fails to connect, verify `MONGO_URI` and network access.
 - The repo contains `.nvmrc` files with Node version `20` — consider using `nvm use` for a matching Node runtime.




