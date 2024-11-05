import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { updateProduct, deleteProduct } from '../services/productService';
import './css/ProductModal.css';

// Set the app element for accessibility
Modal.setAppElement('#root'); // Replace with your app's root element ID

const ProductModal = ({ isOpen, onClose, product, onDelete }) => {
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        price: 0,
        stock: 0,
        description: '', // Add description here
        categories: [] 
    });

    useEffect(() => {
        if (product) {
            setEditedProduct({
                ...product,
                categories: product.categories || [],
                description: product.description || '' // Ensure description is set
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSave = async () => {
        await updateProduct(editedProduct);
        onClose(); // Close the modal after saving
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete && product) {
            await deleteProduct(product._id);
            onDelete(product._id);
            onClose(); // Close the modal after deletion
        }
    };

    if (!product) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Product Details">
            <h2>Edit Product</h2>
            <div className="product-modal-content">
                <div className="product-image">
                    <img src={`https://ipfs.io/ipfs/${product.image}`} alt={product.name} />
                </div>
                <div className="product-details">
                    <label>
                        Name:
                        <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" value={editedProduct.price} onChange={handleChange} />
                    </label>
                    <label>
                        Stock:
                        <input type="number" name="stock" value={editedProduct.stock} onChange={handleChange} />
                    </label>
                    <label>
                        Description: {/* New description field */}
                        <textarea 
                            name="description" 
                            value={editedProduct.description} 
                            onChange={handleChange} 
                        />
                    </label>
                    <label>
                        Categories:
                        <input type="text" name="categories" value={editedProduct.categories.join(', ')} onChange={handleChange} />
                    </label>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <button onClick={onClose}>Close</button>
        </Modal>
    );
};

export default ProductModal;