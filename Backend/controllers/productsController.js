// CRUD products
const Product = require('../models/Product');

// Post products
const createProduct = async (req, res) => {
    const { name, image, description, price, stock } = req.body;
    try {
        const newProduct = new Product({ name, image, description, price, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
}

// Gets all the products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
}

module.exports = { createProduct, getProducts };
// This controller handles the retrieval of all products from the database and returns them in JSON format.