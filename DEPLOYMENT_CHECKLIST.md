# 📋 Vercel Deployment Checklist

## Pre-Deployment (Local Testing)

- [ ] **Clone/Pull latest code**
  ```bash
  git pull
  ```

- [ ] **Run diagnostics**
  ```bash
  cd Backend
  node diagnostics.js
  ```

- [ ] **Setup .env file**
  ```bash
  cp .env.example .env
  # Edit with your local values
  ```

- [ ] **Install dependencies**
  ```bash
  cd Backend && npm install
  cd ../Frontend && npm install
  ```

- [ ] **Test MongoDB connection**
  - Ensure MongoDB is running locally
  - Verify MONGO_URI in .env
  - Expected output: `✅ Connected successfully`

- [ ] **Start local server**
  ```bash
  cd Backend && npm run dev
  ```

- [ ] **Test API endpoints**
  ```bash
  # New terminal
  curl http://localhost:5000
  curl http://localhost:5000/api/health
  ```

- [ ] **Build frontend**
  ```bash
  cd Frontend
  npm run build
  # Should create dist/ folder
  ```

- [ ] **Commit changes**
  ```bash
  git add .
  git commit -m "Prepare for Vercel deployment"
  ```

---

## Vercel Dashboard Setup

- [ ] **Go to Vercel Dashboard**
  - Link: https://vercel.com/dashboard

- [ ] **Select your project**

- [ ] **Navigate to Settings → Environment Variables**

- [ ] **Add Environment Variables** (copy from .env)
  - [ ] `MONGO_URI` → MongoDB connection string
  - [ ] `NODE_ENV` → `production`
  - [ ] `JWT_SECRET` → Random 32-character string
  - [ ] `FRONTEND_URL` → Your frontend domain
  - [ ] `ADMIN_EMAIL` → Your admin email
  - [ ] `ADMIN_PASSWORD` → Your admin password
  - [ ] `BREVO_API_KEY` → Your Brevo API key (optional)

- [ ] **Set environment scope**
  - Select: Production (and Preview if needed)

- [ ] **Verify Settings**
  - Build Command: ✅ Should be auto-detected
  - Root Directory: ✅ Leave blank for monorepo

---

## MongoDB Atlas Setup

- [ ] **Go to MongoDB Atlas**
  - Link: https://cloud.mongodb.com

- [ ] **Select your cluster**

- [ ] **Network Access**
  - Go to: Security → Network Access
  - [ ] Click "Add IP Address"
  - [ ] Enter: `0.0.0.0/0` (allows all IPs for Vercel)
  - [ ] Click "Confirm"

- [ ] **Verify Connection String**
  - Go to: Clusters → Connect
  - Copy: "Connect your application"
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

- [ ] **Special characters in password?**
  - URL-encode them:
    - `@` → `%40`
    - `:` → `%3A`
    - `#` → `%23`
    - `%` → `%25`

---

## GitHub Push (Triggers Auto-Deployment)

- [ ] **Verify git status**
  ```bash
  git status
  ```

- [ ] **Add all changes**
  ```bash
  git add .
  ```

- [ ] **Create meaningful commit**
  ```bash
  git commit -m "Optimize for Vercel deployment - add MongoDB pooling, health checks, diagnostics"
  ```

- [ ] **Push to GitHub**
  ```bash
  git push origin main
  # (or your main branch name)
  ```

- [ ] **Monitor Vercel deployment**
  - Go to Vercel Dashboard → Deployments
  - Watch the build progress
  - Check for errors in logs

---

## Post-Deployment Testing

- [ ] **Wait for deployment to complete**
  - Status should show: ✅ Ready (or similar)

- [ ] **Test health endpoint**
  ```bash
  curl https://your-backend-domain.vercel.app/api/health
  ```
  
  Expected response:
  ```json
  {
    "status": "OK",
    "database": "Connected",
    "timestamp": "2024-01-21T..."
  }
  ```

- [ ] **Test main endpoint**
  ```bash
  curl https://your-backend-domain.vercel.app
  ```

- [ ] **Test orders endpoint** (create test order)
  ```bash
  curl -X POST https://your-backend-domain.vercel.app/api/orders \
    -H "Content-Type: application/json" \
    -d '{
      "productName": "Test Product",
      "clientName": "Test User",
      "address": "Test Address",
      "phone": "555-1234"
    }'
  ```

- [ ] **Check Vercel logs**
  - Deployments → Choose deployment → Logs
  - Look for: `✅ MongoDB connected`
  - No errors should appear

- [ ] **Update Frontend API URL** (if not already set)
  - Your frontend should point to Vercel backend URL
  - Update environment variable: `VITE_API_URL=https://your-backend.vercel.app`

---

## Troubleshooting During Deployment

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm install` works locally |
| Environment variables missing | Verify all vars in Vercel Dashboard |
| MongoDB connection timeout | Check Atlas IP whitelist = `0.0.0.0/0` |
| 500 error on API call | Check Vercel logs for detailed error |
| CORS error from frontend | Update `FRONTEND_URL` env variable |
| Function timeout | Increase timeout in `vercel.json` |

---

## Verification Checklist - Final

- [ ] ✅ Diagnostics passed locally
- [ ] ✅ MongoDB connection string working
- [ ] ✅ All env vars in Vercel Dashboard
- [ ] ✅ GitHub push triggered deployment
- [ ] ✅ Vercel deployment shows "Ready"
- [ ] ✅ `/api/health` endpoint returns OK
- [ ] ✅ Database shows "Connected"
- [ ] ✅ No errors in Vercel logs
- [ ] ✅ API endpoints respond correctly
- [ ] ✅ Frontend can reach backend

---

## Files Modified for Deployment

```
✅ Backend/server.js              - Optimized for serverless
✅ Backend/config/db.js           - Enhanced connection pooling
✅ Backend/.vercelignore          - Exclude unnecessary files
✅ Backend/.env.example           - Environment template
✅ Backend/middleware/            - Error handling (new)
✅ Backend/diagnostics.js         - Testing tool (new)
✅ vercel.json                    - Vercel configuration
✅ VERCEL_DEPLOYMENT_GUIDE.md     - Detailed troubleshooting
✅ QUICK_START_VERCEL.md          - Quick reference
```

---

## Success Indicators

🎉 **You'll know it's working when:**
1. ✅ `curl` to health endpoint returns `"status": "OK"`
2. ✅ Vercel logs show `MongoDB connected`
3. ✅ No `500 Internal Server Error`
4. ✅ Frontend can create orders successfully
5. ✅ Orders appear in MongoDB

---

## Next Steps After Successful Deployment

- [ ] Monitor Vercel Analytics
- [ ] Set up error alerts
- [ ] Test full user flow (browse → order → checkout)
- [ ] Performance optimization if needed
- [ ] Set up CI/CD pipeline improvements
- [ ] Document any additional configurations

---

**Last Updated:** January 21, 2024  
**Status:** ✅ Ready to Deploy
