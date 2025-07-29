const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);
router.post('/login', loginUser);

// Export the router
module.exports = router;