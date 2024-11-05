const express = require('express');
const router = express.Router();

// Hardcoded admin credentials for testing
const adminUsername = '';
const adminPassword = '';

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Received credentials:', username, password);
    console.log('Expected credentials:', adminUsername, adminPassword);

    // Check credentials
    if (username === adminUsername && password === adminPassword) {
        return res.status(200).json({ message: 'Login successful', token: 'your-secure-token' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;