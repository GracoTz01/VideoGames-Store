const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

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

// Get user balance
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

// Purchase a product
const purchaseProduct = async (req, res) => {
    const items = req.body.items;

    // Validar que items sea un array válido
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Invalid items array.' });
    }

    try {
        // Verificar que el usuario exista
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let totalCost = 0;
        const orderItems = [];

        // Validar stock y calcular costo total
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product ${product.name}.` });
            }

            totalCost += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                quantity: item.quantity
            });
        }

        // Verificar saldo del usuario
        if (user.balance < totalCost) {
            return res.status(400).json({ message: 'Insufficient balance for this purchase.' });
        }

        // Descontar saldo
        user.balance -= totalCost;
        await user.save();

        // Actualizar stock de los productos
        for (const item of items) {
            const product = await Product.findById(item.productId);
            product.stock -= item.quantity;
            await product.save();
        }

        // Crear la orden
        const order = new Order({
            user: user._id,
            products: orderItems,
            total: totalCost
        });

        await order.save();

        // Respuesta exitosa
        res.status(200).json({
            message: 'Purchase successful',
            balance: user.balance,
            orderId: order._id,
            products: order.products
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing purchase', error });
    }
}

const getPurchaseHistory = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id})
                                .populate('products.product')
                                .sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Purchase history retrieved successfully',
            orders: orders
    });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving purchase history', error });
    }
}

module.exports = { depositMoney, getUserBalance, purchaseProduct, getPurchaseHistory };