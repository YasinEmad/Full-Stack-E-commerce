const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// Login route for orders management (now uses admin credentials)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (username === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'order', email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: '2h' });

    res.cookie('orderToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000
    });

    return res.json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to verify order token or admin token
function verifyOrderToken(req, res, next) {
  const orderToken = req.cookies.orderToken;
  const adminToken = req.cookies.adminToken;
  if (!orderToken && !adminToken) return res.status(401).json({ error: 'No token provided' });

  // Try order token first
  if (orderToken) {
    return jwt.verify(orderToken, JWT_SECRET, (err, user) => {
      if (!err && user.role === 'order') {
        req.orderUser = user;
        return next();
      }
      // If order token fails, try admin token
      if (adminToken) {
        return jwt.verify(adminToken, JWT_SECRET, (err2, adminUser) => {
          if (!err2 && adminUser.role === 'admin') {
            req.orderUser = adminUser;
            return next();
          }
          return res.status(403).json({ error: 'Invalid token' });
        });
      }
      return res.status(403).json({ error: 'Invalid token' });
    });
  }
  // If only admin token exists
  jwt.verify(adminToken, JWT_SECRET, (err, adminUser) => {
    if (!err && adminUser.role === 'admin') {
      req.orderUser = adminUser;
      return next();
    }
    return res.status(403).json({ error: 'Invalid token' });
  });
}

// Verify route
router.get('/verify', verifyOrderToken, (req, res) => {
  res.json({ success: true });
});

// Logout route
router.post('/logout', (req, res) => {
  res.cookie('orderToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0)
  });
  res.json({ success: true });
});

module.exports = { router, verifyOrderToken };
