// seedOrders.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Order = require('./models/Order');

const orders = [
  {
    productName: 'Classic Blue Denim Jacket',
    address: '123 Main St, Anytown, USA',
    phone: '555-123-4567',
    clientName: 'John Doe'
  },
  {
    productName: 'Premium Cotton T-Shirt',
    address: '456 Oak Ave, Anytown, USA',
    phone: '555-987-6543',
    clientName: 'Jane Smith'
  }
];

// Function to seed orders
const seedOrders = async () => {
  try {
    await connectDB();

    await Order.deleteMany({});
    console.log('Existing orders deleted');

    const inserted = await Order.insertMany(orders);
    console.log(`Inserted ${inserted.length} orders successfully!`);
  } catch (error) {
    console.error('Error seeding orders:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedOrders();
}
