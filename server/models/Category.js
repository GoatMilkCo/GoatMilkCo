const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure category names are unique
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;