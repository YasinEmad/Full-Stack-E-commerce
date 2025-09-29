// migrateUsers.js
// One-time script to delete all users and ensure unique index on email

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function migrate() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    // Delete all users
    const delResult = await User.deleteMany();
    console.log(`Deleted ${delResult.deletedCount} users.`);
    // Drop all indexes and recreate only the correct one
    await mongoose.connection.collection('users').dropIndexes();
    await mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Ensured unique index on email.');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

migrate();
