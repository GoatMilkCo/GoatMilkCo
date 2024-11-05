import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import TopNavBar from './TopNavBar'; 
import ProductViewModal from './ProductViewModal'; // Import your modal here
import './css/Home.css'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await getProducts();
            setLatestProducts(productsData.filter(product => product.categories.includes("latest")));
            setDiscountProducts(productsData.filter(product => product.categories.includes("discounts")));
            setPopularProducts(productsData.filter(product => product.categories.includes("popular")));
        };
        fetchProducts();
    }, []);

    const handleViewAll = (category) => {
        navigate(`/products?category=${category}`);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product); // Set the selected product
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null); // Clear the selected product when closing
    };

    return (
        <div className="home">
            <TopNavBar />
            <h2>Welcome to the E-commerce Store!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.</p>

            <section>
                <h3>Latest Products</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="grid-container">
                    {latestProducts.map((product) => (
                        <div className="grid-item" key={product._id} onClick={() => handleProductClick(product)}>
                            <img src={`https://ipfs.io/ipfs/${product.image}`} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p>${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <button onClick={() => handleViewAll("latest")}>View All</button>
            </section>

            <section>
                <h3>Discount Products</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="grid-container">
                    {discountProducts.map((product) => (
                        <div className="grid-item" key={product._id} onClick={() => handleProductClick(product)}>
                            <img src={`https://ipfs.io/ipfs/${product.image}`} alt={product.name} />
                            <h4>{product.name}</h4>
                            {product.discountedPrice ? (
                                <>
                                    <p className="discount-price">${product.price.toFixed(2)}</p>
                                    <p>${product.discountedPrice.toFixed(2)}</p>
                                </>
                            ) : (
                                <p>${product.price.toFixed(2)}</p>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={() => handleViewAll("discounts")}>View All</button>
            </section>

            <section>
                <h3>Popular Products</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="grid-container">
                    {popularProducts.map((product) => (
                        <div className="grid-item" key={product._id} onClick={() => handleProductClick(product)}>
                            <img src={`https://ipfs.io/ipfs/${product.image}`} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p>${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <button onClick={() => handleViewAll("popular")}>View All</button>
            </section>

            {/* Render the modal conditionally */}
            {isModalOpen && selectedProduct && (
                <ProductViewModal 
                    product={selectedProduct} 
                    onClose={closeModal} 
                />
            )}
        </div>
    );
};

export default Home;