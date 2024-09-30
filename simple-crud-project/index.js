const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

app.use(express.json());



app.get('/', (req, res) => {
    res.send("hello from node api");
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})

app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})

app.post('/api/products', async (req, res) => {
    try {
        console.log(req.body);
        const product = await Product.create(req.body);
        console.log(product);
        res.status(200).json(product);
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
});
