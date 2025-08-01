const express = require('express');
const { depositMoney, getUserBalance, purchaseProduct, getPurchaseHistory } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

// Route to deposit money into user account
router.post('/deposit', verifyToken, depositMoney);
router.get('/balance', verifyToken, getUserBalance);
router.post('/purchase', verifyToken, purchaseProduct);
router.get('/history', verifyToken, getPurchaseHistory);

// Export the user router
module.exports = router;