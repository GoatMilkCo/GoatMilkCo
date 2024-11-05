import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; // Ensure this is the correct API endpoint
const CATEGORY_API_URL = 'http://localhost:5000/api/categories'; // Endpoint for categories

// Function to get all products
const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Function to create a new product
const createProduct = async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
};

// Function to update an existing product
export const updateProduct = async (product) => {
    const url = `${API_URL}/${product._id}`;
    try {
        const response = await axios.put(url, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error.response ? error.response.data : error.message);
        throw error; // Optionally re-throw the error for further handling
    }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
    const response = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
};

// Function to fetch all categories
const getCategories = async () => {
    const response = await axios.get(CATEGORY_API_URL); // Call the categories endpoint
    return response.data;
};

// Function to create a new category
const createCategory = async (category) => {
    const response = await axios.post(CATEGORY_API_URL, category);
    return response.data;
};

// Export the service functions
export { getProducts, createProduct, getCategories, createCategory };