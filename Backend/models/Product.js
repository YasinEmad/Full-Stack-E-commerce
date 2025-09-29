const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['mens', 'womens', 'accessories']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    brand: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    sale: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for improving query performance
productSchema.index({ category: 1, price: 1 });
productSchema.index({ rating: -1 }); // For best sellers query

const Product = mongoose.model('Product', productSchema);

module.exports = Product;