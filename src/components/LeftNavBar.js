import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './css/LeftNavBar.css'; 

const LeftNavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken'); // Remove the token from local storage
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="left-nav-bar">
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/products"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Shop
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin-panel"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Admin Panel
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/user-panel"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        User Panel
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/add-product"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Add Products
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/add-user"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Add Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        onClick={handleLogout}
                        className="logout-link"
                    >
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default LeftNavBar;