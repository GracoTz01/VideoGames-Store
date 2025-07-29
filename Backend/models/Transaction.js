// Transaction model
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['deposit', 'purchase'], required: true },
    amount: { type: Number, required: true, min: 0 },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);