#!/usr/bin/env node

/**
 * Quick validation script to ensure all Vercel optimizations are in place
 * Run: node Backend/validate-deployment.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Vercel Deployment Validation\n');

const checks = [
  {
    name: 'server.js - Lazy DB Connection',
    file: 'Backend/server.js',
    patterns: [
      'ensureDBConnection',
      'Middleware to ensure DB connection',
      '/api/health'
    ]
  },
  {
    name: 'config/db.js - Connection Pooling',
    file: 'Backend/config/db.js',
    patterns: [
      'maxPoolSize',
      'minPoolSize',
      'retryWrites',
      'mongoose.connection.on'
    ]
  },
  {
    name: '.vercelignore - Ignore File',
    file: 'Backend/.vercelignore',
    patterns: ['node_modules', '.env', '.env.local']
  },
  {
    name: 'vercel.json - Vercel Config',
    file: 'vercel.json',
    patterns: ['@vercel/node', 'Backend/server.js', 'maxDuration']
  },
  {
    name: '.env.example - Environment Template',
    file: 'Backend/.env.example',
    patterns: ['MONGO_URI', 'JWT_SECRET', 'FRONTEND_URL']
  },
  {
    name: 'middleware/errorHandler.js - Error Handler',
    file: 'Backend/middleware/errorHandler.js',
    patterns: ['errorHandler', 'asyncHandler', 'ValidationError']
  },
  {
    name: 'diagnostics.js - Testing Tool',
    file: 'Backend/diagnostics.js',
    patterns: ['MONGO_URI', 'testConnection', 'insertOne']
  }
];

const docs = [
  'VERCEL_DEPLOYMENT_GUIDE.md',
  'QUICK_START_VERCEL.md',
  'DEPLOYMENT_CHECKLIST.md',
  'CHANGES_SUMMARY.md'
];

let passedChecks = 0;
let failedChecks = 0;

// Check source files
console.log('📋 Source Code Validation:\n');

checks.forEach((check, index) => {
  const filePath = path.join(__dirname, '..', check.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ${index + 1}. ❌ ${check.name}`);
    console.log(`     File not found: ${check.file}`);
    failedChecks++;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const allPatternsFound = check.patterns.every(pattern => 
    content.includes(pattern)
  );

  if (allPatternsFound) {
    console.log(`  ${index + 1}. ✅ ${check.name}`);
    passedChecks++;
  } else {
    console.log(`  ${index + 1}. ⚠️  ${check.name}`);
    console.log(`     Missing patterns in ${check.file}:`);
    check.patterns.forEach(pattern => {
      if (!content.includes(pattern)) {
        console.log(`     - "${pattern}"`);
      }
    });
    failedChecks++;
  }
});

// Check documentation files
console.log('\n📚 Documentation Validation:\n');

docs.forEach((doc, index) => {
  const docPath = path.join(__dirname, '..', doc);
  const exists = fs.existsSync(docPath);
  
  if (exists) {
    const size = fs.statSync(docPath).size;
    console.log(`  ${index + 1}. ✅ ${doc} (${(size / 1024).toFixed(1)} KB)`);
    passedChecks++;
  } else {
    console.log(`  ${index + 1}. ❌ ${doc}`);
    failedChecks++;
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`\n📊 Results: ${passedChecks} passed, ${failedChecks} failed\n`);

if (failedChecks === 0) {
  console.log('✨ All validations passed! Ready for deployment.\n');
  console.log('📝 Next steps:');
  console.log('  1. Review QUICK_START_VERCEL.md');
  console.log('  2. Run: node Backend/diagnostics.js');
  console.log('  3. Push to GitHub to deploy\n');
  process.exit(0);
} else {
  console.log('⚠️  Some validations failed. Please review the issues above.\n');
  process.exit(1);
}
