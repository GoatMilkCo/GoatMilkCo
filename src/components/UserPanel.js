import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, updateUser, getProducts } from '../services/userService';
import LeftNavBar from './LeftNavBar';
import UserModal from './UserModal';
import UserProductModal from './UserProductModal';
import './css/UserPanel.css';

const UserPanel = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]); // State for products
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [isUserProductModalOpen, setIsUserProductModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);

                const productsData = await getProducts(); // Fetch products
                console.log('Fetched products data:', productsData); // Log the fetched data
                setProducts(productsData.products || productsData); // Adjust according to the actual data structure
            } catch (error) {
                console.error('Failed to fetch users or products:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProducts();
            setAllProducts(productsData.products || productsData); // Ensure allProducts is set correctly
        };

        fetchProducts();
    }, []);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    const handleUserModalClose = () => {
        setIsUserModalOpen(false);
        setSelectedUser(null);
    };

    const handleUserSave = async (updatedUser) => {
        await updateUser(updatedUser);
        setUsers((prevUsers) =>
            prevUsers.map((usr) => (usr._id === updatedUser._id ? updatedUser : usr))
        );
        handleUserModalClose();
    };

    const handleViewUserProducts = (user) => {
        setSelectedUser(user);
        setIsUserProductModalOpen(true);
    };

    const handleUserProductModalClose = () => {
        setIsUserProductModalOpen(false);
        setSelectedUser(null);
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${hours}:${minutes}:${seconds} ${month}/${day}/${year}`;
    };

    const calculateTotalPurchaseAmount = (purchases) => {
        if (!Array.isArray(products)) {
            console.error('Products is not an array:', products);
            return 0; // Return 0 or handle the error as needed
        }

        return purchases.reduce((total, purchase) => {
            const productDetails = products.find(prod => prod._id === purchase.productId);
            const productPrice = productDetails ? productDetails.price : 0;
            return total + (productPrice * purchase.quantity);
        }, 0);
    };

    return (
        <div className="admin-panel">
            <LeftNavBar />
            <div className="content">
                <h1>Admin Panel</h1>
                <div className="table-container">
                    <div className="user-table">
                        <h2>Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Lifetime Buys</th>
                                    <th>Total Purchase Amount</th> {/* Added this column */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td onClick={() => handleViewUserProducts(user)} className="user-name-link">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            {user.purchases ? user.purchases.reduce((acc, purchase) => acc + purchase.quantity, 0) : 0}
                                        </td>
                                        <td>
                                            {/* Calculate total purchase amount */}
                                            {user.purchases ? `$${calculateTotalPurchaseAmount(user.purchases).toFixed(2)}` : '$0.00'}
                                        </td>
                                        <td>
                                            <span className="edit-link" onClick={() => handleEditUser(user)}>Edit</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <UserModal
                    isOpen={isUserModalOpen}
                    onClose={handleUserModalClose}
                    user={selectedUser}
                    onSave={handleUserSave}
                />
                <UserProductModal
                    isOpen={isUserProductModalOpen}
                    onClose={handleUserProductModalClose}
                    user={selectedUser}
                    products={allProducts} // Pass products to the modal
                />
            </div>
        </div>
    );
};

export default UserPanel;