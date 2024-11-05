import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, updateProduct } from '../services/productService';
import LeftNavBar from './LeftNavBar';
import ProductModal from './ProductModal';
import './css/AdminPanel.css';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const productsData = await getProducts();
            setProducts(productsData);
        };
        fetchData();
    }, []);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleProductModalClose = () => {
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    const handleSave = async (updatedProduct) => {
        console.log('Updating product with ID:', updatedProduct._id);
        await updateProduct(updatedProduct);
        setProducts((prevProducts) =>
            prevProducts.map((prod) => (prod._id === updatedProduct._id ? updatedProduct : prod))
        );
        handleProductModalClose();
    };

    const getIpfsUrl = (hash) => `https://ipfs.io/ipfs/${hash}`;

    return (
        <div className="admin-panel">
            <LeftNavBar />
            <div className="content">
                <h1>Admin Panel</h1>
                <div className="table-container">
                    <div className="table">
                        <h2>Products</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Description</th>
                                    <th>Categories</th>
                                    <th>Has Image</th>
                                    <th>Image Hash</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <span className="product-name" onClick={() => handleEditClick(product)} style={{ cursor: 'pointer' }}>
                                                {product.name}
                                            </span>
                                        </td>
                                        <td>${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.description ? 'Yes' : 'No'}</td>
                                        <td>{Array.isArray(product.categories) ? product.categories.join(', ') : '-'}</td>
                                        <td>{product.image ? 'Yes' : 'No'}</td>
                                        <td>
                                            {product.image ? (
                                                <a href={getIpfsUrl(product.image)} target="_blank" rel="noopener noreferrer">
                                                    {product.image.length > 15 ? `${product.image.substring(0, 15)}...` : product.image}
                                                </a>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td>
                                            <span className="edit-link" onClick={() => handleEditClick(product)}>Edit</span>
                                            {/* Delete action removed */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ProductModal
                    isOpen={isProductModalOpen}
                    onClose={handleProductModalClose}
                    product={selectedProduct}
                    onSave={handleSave}
                    onDelete={(productId) => setProducts((prevProducts) => prevProducts.filter((prod) => prod._id !== productId))} // Update state to remove the deleted product
                />
            </div>
        </div>
    );
};

export default AdminPanel;