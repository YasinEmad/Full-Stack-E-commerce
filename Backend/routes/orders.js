const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyOrderToken } = require('./orderAuth');

// Protect listing, update, get single and delete routes with order auth.
// Keep POST / (create order) public so site visitors can place orders.

// Get all orders (protected)
router.get('/', verifyOrderToken, orderController.getAllOrders);

// Create a new order (public)
router.post('/', orderController.createOrder);


// Get a single order by ID (protected)
router.get('/:id', verifyOrderToken, orderController.getOrderById);

// Update an order by ID (protected)
router.put('/:id', verifyOrderToken, orderController.updateOrder);

// Delete an order by ID (protected)
router.delete('/:id', verifyOrderToken, orderController.deleteOrder);

module.exports = router;
