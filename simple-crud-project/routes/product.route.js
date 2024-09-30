const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, editProduct, deleteProduct } = require('../controller/product.controller.js');


router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', createProduct);

router.put('/:id', editProduct);

router.delete('/:id', deleteProduct);

module.exports = router