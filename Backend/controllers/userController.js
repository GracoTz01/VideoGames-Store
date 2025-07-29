const User = require('../models/User');

// Deposit money into user account
const depositMoney = async (req, res) => {
    const { amount } = req.body;
    try {
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero.' });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        user.balance += amount;
        await user.save();
        res.status(200).json({ message: 'Deposit successful', balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error depositing money', error });
    }
}

const getUserBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving balance', error });
    }
}


module.exports = { depositMoney, getUserBalance };