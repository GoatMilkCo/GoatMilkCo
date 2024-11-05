import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/productService'; 
import TopNavBar from './TopNavBar'; 
import './css/ProductList.css';
import ProductViewModal from './ProductViewModal'; // Import the modal
import { useLocation } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Check if a category is provided in the URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const categoryFromUrl = searchParams.get('category');
        
        const fetchProductsAndCategories = async () => {
            const productsData = await getProducts();
            const categoriesData = await getCategories();
            setProducts(productsData);

            const uniqueCategories = categoriesData.map(category => category.name);
            setCategories(uniqueCategories);

            // Set the initial selected category based on the URL, if available
            if (categoryFromUrl) {
                setSelectedCategory(categoryFromUrl);
            }
        };

        fetchProductsAndCategories();
    }, [location.search]);

    const filteredProducts = selectedCategory
        ? products.filter(product => product.categories.includes(selectedCategory))
        : products;

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    return (
        <div className="home">
            <TopNavBar />
            <div className="product-list">
                <h2>Product List</h2>

                {/* Category Dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <div className="grid-container">
                    {filteredProducts.map((product) => (
                        <div className="grid-item" key={product._id} onClick={() => openModal(product)}>
                            <img src={`https://ipfs.io/ipfs/${product.image}`} alt={product.name} />
                            <h3>{product.name}</h3>
                            {product.discountedPrice !== undefined ? (
                                <>
                                    <p style={{ textDecoration: 'line-through', color: 'red' }}>${product.price.toFixed(2)}</p>
                                    <p>Discounted Price: ${product.discountedPrice.toFixed(2)}</p>
                                </>
                            ) : (
                                <p>${product.price.toFixed(2)}</p>
                            )}
                        </div>
                    ))}
                </div>

                {isModalOpen && <ProductViewModal product={selectedProduct} onClose={closeModal} />}
            </div>
        </div>
    );
};

export default ProductList;