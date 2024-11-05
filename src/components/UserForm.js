import React, { useState } from 'react';
import { createUser } from '../services/userService';
import LeftNavBar from './LeftNavBar'; // Ensure LeftNavBar is imported
import './css/UserForm.css'; // Import CSS for the UserForm

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Track admin status

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name: name,
            email: email,
            password: password,
            isAdmin: isAdmin // Capture your admin status
        };

        try {
            const createdUser = await createUser(user);
            console.log('User created:', createdUser);
            // Additional logic (like closing the modal or refreshing the user list)
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="user-form-container">
            <LeftNavBar />
            <div className="form-content">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <input
                        type="text"
                        value={name} // Change from username to name
                        onChange={(e) => setName(e.target.value)} // Update state with name
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        Admin
                    </label>
                    <button type="submit">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;