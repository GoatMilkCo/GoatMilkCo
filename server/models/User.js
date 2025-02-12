const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    purchases: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            timestamp: { type: Date, default: Date.now }
        }
    ],
    lifetimeBuys: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);
module.exports = User;