const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src'); // غيرها لو مجلدك مش src

const WHITESPACE_REGEX = /[\u00A0\u200B\u202F]/g;

function cleanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const cleaned = content.replace(WHITESPACE_REGEX, '');
  if (content !== cleaned) {
    fs.writeFileSync(filePath, cleaned, 'utf-8');
    console.log(`Cleaned: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      cleanFile(fullPath);
    }
  });
}

walk(targetDir);
console.log('Cleaning complete.');
