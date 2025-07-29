require('dotenv').config();

// Import necessary modules
const express = require('express');
const { connectDB } = require('./connection/connect');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// Route imports
app.use('/api', require('./routes'));

// Connect MongoDB and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});