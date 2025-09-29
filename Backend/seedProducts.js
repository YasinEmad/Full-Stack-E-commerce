// seedProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  // Men's Products
  {
    name: 'Classic Blue Denim Jacket',
    category: 'mens',
    price: 89.99,
    brand: 'Levi\'s',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Premium Cotton T-Shirt',
    category: 'mens',
    price: 29.99,
    brand: 'Nike',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Slim Fit Chino Pants',
    category: 'mens',
    price: 59.99,
    brand: 'H&M',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&w=300&q=75',
    inStock: true,
    sale: true,
  },
  {
    name: 'Athletic Running Shoes',
    category: 'mens',
    price: 129.99,
    brand: 'Adidas',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Wool Blend Blazer',
    category: 'mens',
    price: 199.99,
    brand: 'Zara',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },

  // Women's Products
  {
    name: 'Casual White Sneakers',
    category: 'womens',
    price: 79.99,
    brand: 'Puma',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Floral Summer Dress',
    category: 'womens',
    price: 69.99,
    brand: 'H&M',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&w=300&q=75',
    inStock: true,
    sale: true,
  },
  {
    name: 'High-Waisted Yoga Pants',
    category: 'womens',
    price: 89.99,
    brand: 'Lululemon',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Leather Crossbody Bag',
    category: 'womens',
    price: 149.99,
    brand: 'Michael Kors',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Silk Blouse',
    category: 'womens',
    price: 119.99,
    brand: 'Zara',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1559127302-755b2dee0c0a?auto=format&w=300&q=75',
    inStock: false,
    sale: true,
  },

  // Accessories
  {
    name: 'Classic Aviator Sunglasses',
    category: 'accessories',
    price: 159.99,
    brand: 'Ray-Ban',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Leather Watch',
    category: 'accessories',
    price: 299.99,
    brand: 'Fossil',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Canvas Backpack',
    category: 'accessories',
    price: 49.99,
    brand: 'Herschel',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&w=300&q=75',
    inStock: true,
    sale: true,
  },
  {
    name: 'Leather Wallet',
    category: 'accessories',
    price: 79.99,
    brand: 'Tommy Hilfiger',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=300&q=75',
    inStock: true,
    sale: false,
  },
  {
    name: 'Winter Scarf',
    category: 'accessories',
    price: 39.99,
    brand: 'H&M',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1520903920241-fc0b56d2d029?auto=format&w=300&q=75',
    inStock: true,
    sale: true,
  }
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
