import React from 'react';
import './css/UserProductModal.css';

const UserProductModal = ({ isOpen, onClose, user, products }) => {
    if (!isOpen || !user) return null;

    const getProductDetails = (productId) => {
        const productIdString = productId.toString();
        console.log('Looking for product ID:', productIdString);
        console.log('Products array:', products); // Access the correct array

        // Check if products is an array
        if (Array.isArray(products)) {
            const product = products.find((prod) => prod._id.toString() === productIdString);
            console.log('Found product:', product);
            return product ? { name: product.name, price: product.price } : null;
        } else {
            console.error("Products is not an array:", products);
            return null;
        }
    };

    // Calculate total purchase amount
    const totalPurchaseAmount = user.purchases.reduce((total, purchase) => {
        const productDetails = getProductDetails(purchase.productId);
        const productPrice = productDetails ? productDetails.price : 0;
        return total + (productPrice * purchase.quantity);
    }, 0);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>User Details</h2>
                <h3>Name: {user.name}</h3>
                <h3>Email: {user.email}</h3>
                <h3>Total Purchases: {user.purchases ? user.purchases.reduce((acc, purchase) => acc + purchase.quantity, 0) : 0}</h3>
                <h3>Total Purchase Amount: ${totalPurchaseAmount.toFixed(2)}</h3>

                <h3>Purchases:</h3>
                {user.purchases && user.purchases.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.purchases.map((purchase, index) => {
                                const productDetails = getProductDetails(purchase.productId);
                                return (
                                    <tr key={index}>
                                        <td>{productDetails ? productDetails.name : 'Unknown Product'}</td>
                                        <td>{purchase.quantity}</td>
                                        <td>{productDetails ? `$${productDetails.price.toFixed(2)}` : 'N/A'}</td>
                                        <td>{new Date(purchase.timestamp).toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <span>No purchases available</span>
                )}

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default UserProductModal;