const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number, // Add this field to store discounted price
        required: false,
    },
    stock: {
        type: Number,
        required: true,
    },
    categories: {
        type: [String], // Array of strings for categories
        default: [], // Default to an empty array
    },
    image: {
        type: String,
        required: false, // Not required, since some products may not have images
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;