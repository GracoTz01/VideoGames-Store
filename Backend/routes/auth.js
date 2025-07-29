const express = require('express');
const { registerUser } = require('../controllers/authController');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser );

// Export the router
module.exports = router;