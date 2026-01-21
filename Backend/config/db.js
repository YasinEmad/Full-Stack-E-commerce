const mongoose = require('mongoose');

// بنعمل متغير عشان نخزن فيه حالة الاتصال ونمنع الـ Multiple Connections
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // اوعى تعمل process.exit(1) هنا في Vercel
    throw err; // ارمي الـ Error عشان Vercel يطلعه في الـ Logs بس ما يقفلش السيستم
  }
};

module.exports = connectDB;