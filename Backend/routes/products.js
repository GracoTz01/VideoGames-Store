// Routers products
const express = require('express');
const { createProduct, getProducts } = require('../controllers/productsController');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

// Define the route to get all products
router.get('/', getProducts);
router.post('/', verifyToken, isAdmin, createProduct);

// Export the products router
module.exports = router;