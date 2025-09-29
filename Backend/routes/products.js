const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const { verifyAdminToken } = require('./admin');

// Get all products with optional filtering
router.get('/', productController.getAllProducts);

// Get best sellers
router.get('/best-sellers', productController.getBestSellers);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Get a single product
router.get('/:id', productController.getProduct);

// Create a new product
router.post('/', verifyAdminToken, productController.createProduct);

// Update a product
router.put('/:id', verifyAdminToken, productController.updateProduct);

// Delete a product
router.delete('/:id', verifyAdminToken, productController.deleteProduct);

module.exports = router;