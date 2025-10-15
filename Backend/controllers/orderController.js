const Order = require("../models/Orders");

const Product = require("../models/Product");

// Create a new order
const createOrder = async (req, res) => {
  const { user, products } = req.body;

  try {
    const savedOrders = [];
    for (const product of products) {
      const productData = await Product.findById(product.product);
      if (!productData) {
        return res.status(404).json({ message: `Product with id ${product.product} not found` });
      }

      const newOrder = new Order({
        userId: "60d21b4667d0d8992e610c85", // dummy user id for now
        productName: productData.name,
        buyerName: user.name,
        phone: user.phone,
        address: user.address,
        size: product.size,
      });
      const savedOrder = await newOrder.save();
      savedOrders.push(savedOrder);
    }
    res.status(201).json(savedOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
