import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Could not fetch products. Please try again later."); // Set error message
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - ${product.price} - Stock: {product.stock}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;