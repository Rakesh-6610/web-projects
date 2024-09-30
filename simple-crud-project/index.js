const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

app.use(express.json());

mongoose.connect("mongodb+srv://admin:root@backenddb.njkaw.mongodb.net/Node-api?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("DB connected")
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log("DB connection error: ", err)
    })


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

app.get("/api/product/:id", async (req, res) => {
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




// update a product
app.put('/api/product/:id', async (req, res) => {
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
})