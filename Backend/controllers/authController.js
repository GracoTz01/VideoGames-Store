const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword 
        });

        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ userId : newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { registerUser };