# Vercel Deployment Troubleshooting Guide

## ✅ Your Code Status
Great news! Your code **already uses Mongoose/MongoDB** and doesn't have any file system write operations. The EROFS error is likely caused by configuration issues, not code problems.

---

## 🔴 Common EROFS Issues & Solutions

### 1. **Missing or Incorrect Environment Variables**
The most common cause of 500 errors on Vercel.

**Solution:**
1. Go to your Vercel Project Dashboard
2. Navigate to **Settings → Environment Variables**
3. Add these critical variables:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   FRONTEND_URL=<your_frontend_url>
   NODE_ENV=production
   JWT_SECRET=<a_secure_random_string>
   ADMIN_EMAIL=<your_admin_email>
   ADMIN_PASSWORD=<your_admin_password>
   BREVO_API_KEY=<your_brevo_key>
   ```

**Important:** 
- Your MongoDB connection string must include username/password
- MongoDB Atlas IP whitelist must be set to `0.0.0.0/0`
- Use different `.env.local` values for local dev vs Vercel

---

### 2. **MongoDB Connection Issues**

**Verify your MongoDB URI format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority
```

**Checklist:**
- ✅ Username and password are URL-encoded (if they contain special chars)
- ✅ IP Whitelist includes `0.0.0.0/0` or Vercel IP addresses
- ✅ Database user has correct permissions (readWrite)
- ✅ Connection string doesn't have typos

**Test connection locally:**
```bash
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ Connected')).catch(e => console.error('❌ Error:', e.message));"
```

---

### 3. **Vercel `vercel.json` Configuration**

Create a `vercel.json` in your **Backend** folder (or root):

```json
{
  "version": 2,
  "buildCommand": "echo 'Build complete'",
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "Backend/server.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

Or at the root level for full-stack deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "Backend/server.js",
      "use": "@vercel/node",
      "config": { "maxLambdaSize": "50mb" }
    },
    {
      "src": "Frontend/package.json",
      "use": "@vercel/static-builds",
      "config": { "distDir": "Frontend/dist" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "Backend/server.js" },
    { "src": "/(.*)", "dest": "Frontend/dist/$1" }
  ]
}
```

---

### 4. **CORS Configuration Issues**

Ensure your CORS is properly configured:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map(s => s.trim()) 
    : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

### 5. **Serverless Function Timeout**

Vercel serverless functions have a default 30-second timeout.

**Solution:** Add this to `vercel.json`:
```json
{
  "functions": {
    "Backend/server.js": {
      "maxDuration": 60
    }
  }
}
```

---

### 6. **Logging & Debugging**

Vercel shows logs in real-time. Check them:
1. In Vercel Dashboard → Deployments → Logs
2. Use `console.log()` for debugging (they appear in logs)
3. Avoid file-based logging (causes EROFS errors)

**Add better error handling:**
```javascript
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error'
      : err.message
  });
});
```

---

## 📋 Step-by-Step Deployment Checklist

- [ ] **1. Update `.env` files**
  - Create `.env` locally with development variables
  - Add all variables to Vercel Dashboard

- [ ] **2. Verify MongoDB**
  - Whitelist `0.0.0.0/0` in MongoDB Atlas
  - Test connection string locally

- [ ] **3. Install Vercel CLI** (optional but recommended)
  ```bash
  npm i -g vercel
  ```

- [ ] **4. Deploy Backend**
  ```bash
  cd Backend
  vercel
  ```

- [ ] **5. Deploy Frontend**
  - Update `VITE_API_URL` env variable to point to your Vercel backend
  ```bash
  cd Frontend
  vercel
  ```

- [ ] **6. Test Health Endpoint**
  ```bash
  curl https://your-backend.vercel.app/api/health
  ```

---

## 🚀 Additional Performance Tips

1. **Use MongoDB Connection Pooling** (already in your `db.js`)
2. **Add request timeouts** for external API calls
3. **Compress responses:**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```
4. **Cache frequently accessed data** using Redis (optional)

---

## 🆘 If Issues Persist

1. Check Vercel deployment logs
2. Verify MongoDB network access settings
3. Test all environment variables are set
4. Check for circular dependencies in imports
5. Ensure `node_modules` is not included in Vercel deployment

---

## ✨ Your Code is Good!

Your implementation follows best practices:
- ✅ Uses Mongoose/MongoDB (no file storage)
- ✅ Proper error handling
- ✅ Environment-aware configuration
- ✅ Connection pooling enabled
- ✅ No EROFS-causing code

The issue is almost certainly environment/configuration related!
