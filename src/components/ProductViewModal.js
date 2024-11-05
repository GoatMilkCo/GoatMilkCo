import React from 'react';
import './css/ProductViewModal.css'; // Assuming you have styles in this file

const ProductViewModal = ({ product, onClose }) => {
    if (!product) return null; // If no product, do not render anything

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{product.name}</h2>
                <img src={`https://ipfs.io/ipfs/${product.image}`} alt={product.name} />
                <p>Price: ${product.price.toFixed(2)}</p>
                {product.discountedPrice !== undefined && (
                    <>
                        <p style={{ textDecoration: 'line-through', color: 'red' }}>
                            Original Price: ${product.price.toFixed(2)}
                        </p>
                        <p>Discounted Price: ${product.discountedPrice.toFixed(2)}</p>
                    </>
                )}
                <p>Description: {product.description}</p> {/* Assuming your product has a description field */}
            </div>
        </div>
    );
};

export default ProductViewModal;