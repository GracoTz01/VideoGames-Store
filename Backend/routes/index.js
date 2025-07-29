// Routes here
const express = require('express');
const router = express.Router();

// Use auth routes
router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/products', require('./products'));

// Export the main router
module.exports = router;