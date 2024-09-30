const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: False }));

app.use('/api/products', productRoute)



app.get('/', (req, res) => {
    res.send("hello from node api");
});



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