const express = require('express');
const { depositMoney, getUserBalance, purchaseProduct } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

// Route to deposit money into user account
router.post('/deposit', verifyToken, depositMoney);
router.get('/balance', verifyToken, getUserBalance);
router.post('/purchase', verifyToken, purchaseProduct);

// Export the user router
module.exports = router;