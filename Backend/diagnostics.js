#!/usr/bin/env node

/**
 * Vercel Deployment Diagnostic Script
 * Run this locally before deploying to identify issues
 */

require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 E-commerce Deployment Diagnostic\n');

// Check environment variables
console.log('📋 Environment Variables Check:');
const requiredEnvs = [
  'MONGO_URI',
  'NODE_ENV',
  'JWT_SECRET',
  'FRONTEND_URL'
];

const optionalEnvs = [
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
  'BREVO_API_KEY'
];

let envOK = true;

requiredEnvs.forEach(env => {
  if (process.env[env]) {
    console.log(`  ✅ ${env}: ${env === 'MONGO_URI' ? '***hidden***' : process.env[env].substring(0, 30) + '...'}`);
  } else {
    console.log(`  ❌ ${env}: MISSING (Required)`);
    envOK = false;
  }
});

optionalEnvs.forEach(env => {
  if (process.env[env]) {
    console.log(`  ✅ ${env}: present`);
  } else {
    console.log(`  ⚠️  ${env}: not set (optional)`);
  }
});

if (!envOK) {
  console.log('\n❌ Missing required environment variables!');
  process.exit(1);
}

// Test MongoDB Connection
console.log('\n🗄️  MongoDB Connection Test:');

const testConnection = async () => {
  try {
    console.log('  Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000
    });

    console.log(`  ✅ Connected successfully`);
    console.log(`  Database: ${conn.connection.db.databaseName}`);
    console.log(`  Host: ${conn.connection.host}`);
    
    // Test write operation
    console.log('\n📝 Testing database write operation...');
    const testCol = conn.connection.collection('_test_connection');
    
    const testDoc = { test: true, timestamp: new Date() };
    const result = await testCol.insertOne(testDoc);
    console.log(`  ✅ Write successful (ID: ${result.insertedId})`);
    
    // Clean up
    await testCol.deleteOne({ _id: result.insertedId });
    console.log(`  ✅ Cleanup successful`);
    
    mongoose.connection.close();
    console.log('\n✨ All checks passed! Ready for Vercel deployment.');
    process.exit(0);
  } catch (error) {
    console.error(`  ❌ Connection failed:`);
    console.error(`     ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n   Troubleshooting:');
      console.error('   - Is MongoDB running locally?');
      console.error('   - Is the URI pointing to the correct server?');
    } else if (error.message.includes('unauthorized')) {
      console.error('\n   Troubleshooting:');
      console.error('   - Check MongoDB username/password');
      console.error('   - Ensure user has readWrite permissions');
    } else if (error.message.includes('IP')) {
      console.error('\n   Troubleshooting:');
      console.error('   - Add your IP to MongoDB Atlas whitelist');
      console.error('   - For Vercel, use 0.0.0.0/0');
    }
    
    mongoose.connection.close();
    process.exit(1);
  }
};

testConnection();
