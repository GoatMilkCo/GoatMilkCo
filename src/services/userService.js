import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; 

// User service functions
const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
    }
};

const createUser = async (user) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; 
    }
};

const updateUser = async (user) => {
    try {
        const response = await axios.put(`${API_URL}/${user._id}`, user);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/${userId}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Product service functions
const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`); // Update the URL
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; 
    }
};

const getProductDetails = (products, productId) => { // Accept products as a parameter
    const productIdString = productId.toString(); // Ensure comparison is between strings
    console.log('Looking for product ID:', productIdString);
    
    const product = products.find((prod) => prod._id.toString() === productIdString);
    
    console.log('Found product:', product);
    
    return product ? { name: product.name, price: product.price } : null;
};

// Export all functions at once
export { getUsers, createUser, updateUser, deleteUser, getProducts, getProductDetails };