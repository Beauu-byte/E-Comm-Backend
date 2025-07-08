const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {
        const { title, description, image, category, price, stock } = req.body;
        const product = new Product({ title, description, image, category, price, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createProduct, getProducts };