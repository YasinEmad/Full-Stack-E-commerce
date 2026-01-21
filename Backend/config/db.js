const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('[DB] Using existing MongoDB connection');
    return;
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    console.log('[DB] Initiating MongoDB connection...');
    
    // شيلنا الـ retryAttempts والـ Options اللي بتعمل مشاكل
    const db = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('[DB] ✅ MongoDB connected successfully');
    
    return db;
  } catch (err) {
    console.error('[DB] ❌ MongoDB connection failed:', err.message);
    isConnected = false;
    throw err;
  }
};

module.exports = connectDB;