const Product = require('../models/product.model.js');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
};

const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const product = await Product.create(req.body);
        console.log(product);
        res.status(200).json(product);
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
};


const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }

        const updated_product = await Product.findById(id);
        res.status(200).json(updated_product);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });


    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
};


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
}