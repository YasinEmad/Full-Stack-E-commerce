# Deployment guide: Railway (backend) + Vercel (frontend)

This repository contains two deployable apps:

- Backend: `Backend/` — Node/Express API (uses MongoDB)
- Frontend: `Frontend/` — Vite + React app

Below are minimal steps and required environment variables.

## Backend — Railway

1. Install Railway CLI (optional but helpful):
   ```bash
   npm i -g @railway/cli
   ```

2. On Railway.app:
   - Create a new project
   - Connect your GitHub repository
   - Select the repository and branch
   - Railway will auto-detect the Node.js project

3. Add the following environment variables in Railway dashboard:
   ```
   MONGO_URI=your_mongodb_connection_string
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   JWT_SECRET=your_jwt_secret
   ORDER_EMAIL=your_order_email
   ORDER_PASSWORD=your_order_password
   BREVO_API_KEY=your_brevo_api_key
   FRONTEND_URL=your_vercel_frontend_url
   ```

4. The project will auto-deploy. Railway uses Node 20 by default which matches our `.nvmrc`.

Notes:
- The backend's CORS origin is configurable via `FRONTEND_URL`. In development it defaults to `*`.
- Railway will generate a production URL for your backend automatically.

## Frontend — Vercel

1. On Vercel, create a new project from the same repository.
2. In project settings, set the root directory to `Frontend`.
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add an environment variable:
   - VITE_API_BASE: Your Railway backend URL (e.g., `https://<your-app>.railway.app`)

Local dev:
- Frontend uses `VITE_API_BASE` (falls back to `http://localhost:5000`).
- Backend uses `.nvmrc` node version and expects `MONGO_URI` locally (or defaults in some scripts).

## Quick checklist

- [ ] Configure Backend env vars in Railway dashboard
- [ ] Deploy Backend -> get Railway URL
- [ ] Set Railway URL as `VITE_API_BASE` in Vercel
- [ ] Set Vercel frontend URL as `FRONTEND_URL` in Railway
- [ ] Deploy Frontend on Vercel (root: `Frontend`)

## Using Railway CLI (optional)

```bash
# Login to Railway
railway login

# Link your project
railway link

# Deploy
railway up

# View logs
railway logs

# List environment variables
railway variables list

# Add environment variables
railway variables set FRONTEND_URL=https://your-frontend.vercel.app
```

## Troubleshooting

- If you see `ECONNREFUSED` from the frontend, check `VITE_API_BASE` and that the Railway service is running.
- Check Railway logs for startup errors (missing env vars, DB connection failures).
- Use `railway logs` to debug backend issues.
- Make sure all environment variables are set in Railway dashboard.
