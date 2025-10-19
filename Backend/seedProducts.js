// seedProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  // Men's Products
  {
    name: 'Classic Blue Denim Jacket',
    category: 'tech',
    price: 89.99,
    brand: 'Levi\'s',
    rating: 4.5,
    description: 'A timeless denim jacket made with durable cotton fabric, perfect for casual outfits.',
    colors: ['blue', 'black'],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&w=300&q=75',
    image2: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&w=300&q=75',
    image3: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Premium Cotton T-Shirt',
    category: 'arab',
    price: 29.99,
    brand: 'Nike',
    rating: 4.8,
    description: 'Soft cotton t-shirt with a classic fit, suitable for daily wear.',
    colors: ['white', 'black', 'grey'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=300&q=75',
    image2: 'https://images.unsplash.com/photo-1520975918318-8c7d3b2c82a4?auto=format&w=300&q=75',
    image3: 'https://images.unsplash.com/photo-1520975918318-1d3f3f82a4ff?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Slim Fit Chino Pants',
    category: 'tech',
    price: 59.99,
    brand: 'H&M',
    rating: 4.2,
    description: 'Slim fit chinos made from stretch cotton for extra comfort.',
    colors: ['beige', 'navy', 'black'],
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&w=300&q=75',
    image2: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&w=300&q=75',
    image3: 'https://images.unsplash.com/photo-1505904267569-42a1b6238e8d?auto=format&w=300&q=75',
    inStock: true,
    sale: true,
  },

  // Women's Products
  {
    name: 'Floral Summer Dress',
    category: 'tech',
    price: 69.99,
    brand: 'H&M',
    rating: 4.3,
    description: 'Lightweight summer dress with floral print, ideal for warm weather.',
    colors: ['red', 'yellow', 'white'],
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&w=300&q=75',
    image2: 'https://images.unsplash.com/photo-1520962912498-9e9d52d778f4?auto=format&w=300&q=75',
    image3: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&w=300&q=75',
    inStock: true,
    sale: true,
  },

  // Accessories
  {
    name: 'Classic Aviator Sunglasses',
    category: 'accessories',
    price: 159.99,
    brand: 'Ray-Ban',
    rating: 4.8,
    description: 'Stylish aviator sunglasses with UV protection and metal frame.',
    colors: ['black', 'silver', 'gold'],
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&w=300&q=75',
    image2: 'https://images.unsplash.com/photo-1572935196237-14b3f281503f?auto=format&w=300&q=75',
    image3: 'https://images.unsplash.com/photo-1572632196237-14b3f281503f?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
];


// Function to seed products
const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    console.log('Existing products deleted');

    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} products successfully!`);
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedProducts();
}
