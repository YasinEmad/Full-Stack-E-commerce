const mongoose = require('mongoose');
const shortid = require('shortid');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        default: shortid.generate,
        unique: true,
        required: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
