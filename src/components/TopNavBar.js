import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/TopNavBar.css';

const TopNavBar = () => {
    return (
        <div className="top-nav-bar">
            <ul>
                <li>
                    <NavLink 
                        to="/login" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Admin
                    </NavLink>
                </li>
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
            </ul>
        </div>
    );
};

export default TopNavBar;