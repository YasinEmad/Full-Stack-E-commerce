require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Order = require('./models/Orders');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

connectDB();

const orders = [
  {
    productName: "Sample Product 1",
    buyerName: "John Doe",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    size: "M",
  },
  {
    productName: "Sample Product 2",
    buyerName: "Jane Smith",
    phone: "098-765-4321",
    address: "456 Oak Ave, Somewhere, USA",
    size: "L",
  },
  {
    productName: "Sample Product 3",
    buyerName: "Peter Jones",
    phone: "555-555-5555",
    address: "789 Pine Ln, Nowhere, USA",
  },
];

const User = require('./models/User');

const importData = async () => {
  try {
    const user = await User.findOne();
    if (!user) {
      console.error('No user found. Please seed users first.');
      process.exit(1);
    }

    const ordersWithUser = orders.map(order => ({
      ...order,
      userId: user._id,
    }));

    await Order.deleteMany();
    await Order.insertMany(ordersWithUser);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
