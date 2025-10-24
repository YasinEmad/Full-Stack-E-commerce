require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedback');
const app = express();

// Enable CORS for all routes with credentials
app.use(cors({
  origin: '*',
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

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);


// Start server with error handling
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});