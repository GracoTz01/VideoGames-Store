// Routers products
const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productsController');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

// Define the route to get all products
router.post('/', verifyToken, isAdmin, createProduct);
router.get('/', getProducts);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);



// Export the products router
module.exports = router;