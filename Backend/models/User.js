// User Model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type : String, required: true, unique: true },
    password: { type : String, required: true },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);