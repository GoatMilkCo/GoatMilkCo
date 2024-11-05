const express = require('express');
const User = require('../models/User');
const Product = require('../models/Products'); // Ensure you import your Product model
const router = express.Router();

// Create a user
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message, errors: error.errors });
        }
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send(error);
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message, errors: error.errors });
        }
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

// Get users and products
router.get('/products', async (req, res) => {
    try {
        const users = await User.find();
        const products = await Product.find();
        res.json({ users, products });
    } catch (error) {
        console.error('Failed to fetch users or products:', error);
        res.status(500).json({ message: 'Failed to fetch users or products', error: error.message });
    }
});

// Export the router
module.exports = router;