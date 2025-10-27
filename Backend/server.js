require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedback');
const app = express();

// Configure CORS: in production set FRONTEND_URL to the deployed frontend origin (comma-separated if multiple)
const FRONTEND_URL = process.env.FRONTEND_URL || '*';
app.use(cors({
  origin: process.env.FRONTEND_URL ? FRONTEND_URL.split(',').map(s => s.trim()) : '*',
  credentials: true
}));


// Enable cookie parser
app.use(cookieParser());

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use('/api/feedback', feedbackRoutes);

// Basic route to test server
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the E-commerce API' });
});

// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const { router: adminRoutes, verifyAdminToken } = require('./routes/admin');
const { router: orderAuthRoutes } = require('./routes/orderAuth');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
// mount order auth routes under /api/orders/auth
app.use('/api/orders/auth', orderAuthRoutes);


// Start server with error handling
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});