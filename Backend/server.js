require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedback');

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const { router: adminRoutes } = require('./routes/admin');
const { router: orderAuthRoutes } = require('./routes/orderAuth');

const app = express();

// 1. Connect to DB
connectDB();

// 2. Configure CORS
const FRONTEND_URL = process.env.FRONTEND_URL || '*';
app.use(cors({
  origin: process.env.FRONTEND_URL ? FRONTEND_URL.split(',').map(s => s.trim()) : '*',
  credentials: true
}));

// 3. Middlewares
app.use(cookieParser());
app.use(express.json());

// 4. Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders/auth', orderAuthRoutes);

// Basic route to test server
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the E-commerce API',
    status: 'Running'
  });
});

// 5. Server Handling for Local vs Production
const PORT = process.env.PORT || 5000;

// ده الجزء المهم لـ Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log(`Server running on port ${PORT}`);
  });
}

// تصدير الـ app ضروري جداً لـ Vercel
module.exports = app;