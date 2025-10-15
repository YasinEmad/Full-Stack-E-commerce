const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET /api/orders - return all orders
router.get('/', orderController.getOrders);

// POST /api/orders - create a new order
router.post('/', orderController.createOrder);

// GET /api/orders/:id - get an order by ID
router.get('/:id', orderController.getOrderById);

// PUT /api/orders/:id - update an order by ID
router.put('/:id', orderController.updateOrder);

// DELETE /api/orders/:id - delete an order by ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
