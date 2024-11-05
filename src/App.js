import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopNavBar from './components/TopNavBar'; 
import LeftNavBar from './components/LeftNavBar'; 
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Login from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';

// Simulating admin authentication
const isAdminAuthenticated = () => {
    return !!localStorage.getItem('adminToken'); // Checks for token in local storage
};

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
    return isAdminAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
    useEffect(() => {
        // Set the app element for accessibility
        Modal.setAppElement('#root'); // Ensure this matches your HTML
    }, []);

    return (
        <Router>
            <div>
                <TopNavBar />
                {isAdminAuthenticated() && <LeftNavBar />}
                <div style={{ marginTop: isAdminAuthenticated() ? '60px' : '0' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/add-product" element={<ProtectedRoute element={<ProductForm />} />} />
                        <Route path="/users" element={<ProtectedRoute element={<UserList />} />} />
                        <Route path="/add-user" element={<ProtectedRoute element={<UserForm />} />} />
                        <Route path="/admin-panel" element={<ProtectedRoute element={<AdminPanel />} />} />
                        <Route path="/user-panel" element={<ProtectedRoute element={<UserPanel />} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;