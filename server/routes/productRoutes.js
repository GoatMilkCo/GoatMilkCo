const express = require('express');
const Product = require('../models/Products');
const router = express.Router();

// Create a product
router.post('/', async (req, res) => {
    const { name, price, stock, categories, image, discountedPrice } = req.body; // Destructure incoming fields
    const product = new Product({
        name,
        price,
        discountedPrice: discountedPrice || price, // Set discountedPrice to the original price if not provided
        stock,
        categories,
        image
    });

    try {
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const { name, price, stock, categories, image, discountedPrice } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            price,
            discountedPrice: discountedPrice || price,
            stock,
            categories,
            image
        }, { new: true });
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id); // assuming you're using Mongoose
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

router.post('/update-product-description', async (req, res) => {
    const { id, description } = req.body;
    try {
        const result = await Product.updateOne({ _id: id }, { $set: { description } });
        if (result.nModified === 0) {
            return res.status(404).send({ message: 'Product not found or description is the same.' });
        }
        res.status(200).send({ message: 'Product description updated successfully.' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Export the router
module.exports = router;