// Routes here
const express = require('express');
const authRoutes = require('./auth');
const router = express.Router();

// Use auth routes
router.use('/auth', require('./auth'));

// Export the main router
module.exports = router;