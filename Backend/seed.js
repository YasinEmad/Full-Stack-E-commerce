// seed.js
// Improved script to seed fake user data into MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const users = require('./data');

// Helper to format user data for the User schema
function formatUsers(rawUsers) {
  return rawUsers.map(u => ({
    name: u.name,
    email: u.email,
    age: u.age,
    address: u.address,
    phone: u.phone
  }));
}

// Main seeding function with improved error handling and logging
async function seedUsers() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Remove all existing users
    const deleteResult = await User.deleteMany();
    console.log(`Deleted ${deleteResult.deletedCount} existing users.`);

    // Insert formatted fake users
    const formattedUsers = formatUsers(users);
    const inserted = await User.insertMany(formattedUsers);
    console.log(`Inserted ${inserted.length} users successfully!`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding users:', err);
    process.exit(1);
  } finally {
    // Ensure connection is closed
    mongoose.connection.close();
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  seedUsers();
}
