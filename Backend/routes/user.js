const express = require('express');
const { depositMoney } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

// Route to deposit money into user account
router.post('/deposit', verifyToken, depositMoney);

// Export the user router
module.exports = router;