const Product = require('../models/Product');

const productController = {
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const { category, minPrice, maxPrice, brand } = req.query;
            const filter = {};
            if (category) filter.category = category;
            if (brand) filter.brand = brand;
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = Number(minPrice);
                if (maxPrice) filter.price.$lte = Number(maxPrice);
            }

            const products = await Product.find(filter);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get best sellers
    getBestSellers: async (req, res) => {
        try {
            const products = await Product.find().sort({ rating: -1 }).limit(10);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get products by category
    getProductsByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const products = await Product.find({ category });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single product
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new product
    createProduct: async (req, res) => {
        try {
            const product = new Product(req.body);
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update a product
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a product
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController;
