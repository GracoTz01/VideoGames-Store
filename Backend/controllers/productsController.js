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

// Update product
const updateProduct =async (req, res) => {
    const { id } = req.params;
    const { name, image, description, price, stock } = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name || product.name;
        product.image = image || product.image;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;

        await product.save();
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
}

// Delete product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.remove();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
}

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
// This controller handles the retrieval of all products from the database and returns them in JSON format.