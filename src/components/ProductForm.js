import React, { useState, useEffect } from 'react';
import { createProduct, getCategories, createCategory } from '../services/productService';
import ipfs from '../ipfsClient'; // Adjust the path as necessary
import LeftNavBar from './LeftNavBar'; 
import './css/ProductForm.css'; 

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState(''); // New state for description
    const [categories, setCategories] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [discount, setDiscount] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(); 
                setCategories(data);
            } catch (err) {
                setError('Failed to load categories.');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const uploadImageToIPFS = async (file) => {
        try {
            const added = await ipfs.add(file);
            const ipfsHash = added.path;
            console.log('IPFS Hash:', ipfsHash);
            return ipfsHash;
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!imageFile) {
            setError('Please upload an image.');
            return;
        }

        try {
            const hash = await uploadImageToIPFS(imageFile);
            const priceFloat = parseFloat(price);
            const discountAmount = discount ? (priceFloat * (parseFloat(discount) / 100)) : 0; 
            const discountedPrice = priceFloat - discountAmount;

            const product = { 
                name, 
                price: priceFloat, 
                discountedPrice: discountedPrice, 
                stock, 
                description, // Include description
                categories: [selectedCategory], 
                image: hash 
            };

            await createProduct(product);
            resetFormFields();
        } catch (err) {
            setError('Failed to create product.');
        }
    };

    const handleNewCategorySubmit = async (e) => {
        e.preventDefault();
        if (newCategory.trim() && !categories.some(category => category.name === newCategory)) {
            try {
                await createCategory({ name: newCategory });
                setNewCategory(''); 
                const updatedCategories = await getCategories(); 
                setCategories(updatedCategories);
                setSelectedCategory(''); 
            } catch (err) {
                setError('Failed to create category.');
            }
        } else {
            setError('Category already exists or is empty.');
        }
    };

    const resetFormFields = () => {
        setName('');
        setPrice('');
        setStock('');
        setDiscount('');
        setDescription(''); // Reset description
        setSelectedCategory(''); 
        setNewCategory(''); 
        setImageFile(null);
        setError('');
    };

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="product-form-container">
            <LeftNavBar />
            <div className="form-content">
                <div className="image-upload">
                    <h2>Add Product</h2>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImageFile(e.target.files[0])} 
                        required 
                    />
                </div>
                <div className="product-details">
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Product Name" 
                            required 
                        />
                        <input 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            placeholder="Price" 
                            required 
                        />
                        <input 
                            type="number" 
                            value={discount} 
                            onChange={(e) => setDiscount(e.target.value)} 
                            placeholder="Discount Percentage (optional)" 
                        />
                        <input 
                            type="number" 
                            value={stock} 
                            onChange={(e) => setStock(e.target.value)} 
                            placeholder="Stock" 
                            required 
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Product Description" 
                            required 
                        />
                        <label htmlFor="category-select">Select Category:</label>
                        <select 
                            id="category-select" 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        <label htmlFor="new-category">Add New Category:</label>
                        <input 
                            type="text" 
                            id="new-category" 
                            value={newCategory} 
                            onChange={(e) => setNewCategory(e.target.value)} 
                            placeholder="New Category Name" 
                        />
                        <button type="button" onClick={handleNewCategorySubmit}>Add Category</button>
                        <button type="submit">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;