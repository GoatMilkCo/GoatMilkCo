const express = require('express');
const Category = require('../models/Category'); // Adjust the path according to your model structure
const router = express.Router();

// Create a category
router.post('/', async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;