const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config(); 
console.log('Environment Variables:', process.env); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoUri = `${process.env.MONGO_URL}/${process.env.DATABASE}?authSource=admin`; 
console.log('MongoDB URI:', mongoUri);

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.ADMIN,
    pass: process.env.PASSWORD,
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});