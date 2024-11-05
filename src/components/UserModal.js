import React, { useState, useEffect } from 'react';
import './css/UserModal.css'; // Import your CSS file for styling

const UserModal = ({ isOpen, onClose, user, onSave, onDelete }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...user, ...formData }); // Pass updated data back to parent
    };

    const handleDelete = () => {
        onDelete(user._id); // Pass user ID to delete function
    };

    if (!isOpen) return null;

    return (
        <div className="user-modal-overlay">
            <div className="user-modal-content">
                <h2>{user ? 'Edit User' : 'Add User'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep unchanged"
                        />
                    </label>
                    <div className="user-modal-buttons">
                        <button type="submit">Save</button>
                        {user && <button type="button" onClick={handleDelete}>Delete</button>}
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;