import React, { useState, useEffect } from 'react';
import './css/Modal.css';

const Modal = ({ isOpen, onClose, product, onSave, onDelete }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (product) {
            setFormData({ ...product, discount: '', category: '' }); // Clear discount and category
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const discountValue = parseFloat(formData.discount);
        const updatedData = {
            ...formData,
            discountedPrice: isNaN(discountValue) || discountValue <= 0 ? formData.price : formData.price - discountValue,
            categories: formData.category ? [...formData.categories, formData.category] : formData.categories,
        };

        onSave(updatedData);
    };

    const handleDelete = async () => {
        try {
            await onDelete(product._id);
            onClose();
        } catch (error) {
            console.error('Failed to delete product:', error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Image (IPFS Hash):</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Discount:</label>
                        <input
                            type="number"
                            name="discount"
                            value={formData.discount || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleDelete}>Delete</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;