const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

// Admin credentials from environment variables only
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Check if environment variables are set
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (username === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Generate JWT token
    const token = jwt.sign({ role: 'admin', email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: '2h' });
    
    // Set the token in an HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours in milliseconds
    });
    
    return res.json({ success: true });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to verify admin JWT
function verifyAdminToken(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err || user.role !== 'admin') return res.status(403).json({ error: 'Invalid token' });
    req.admin = user;
    next();
  });
}

// Verification endpoint
router.get('/verify', verifyAdminToken, (req, res) => {
  res.json({ success: true });
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.cookie('adminToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0) // This will immediately expire the cookie
  });
  res.json({ success: true });
});

module.exports = { router, verifyAdminToken };
