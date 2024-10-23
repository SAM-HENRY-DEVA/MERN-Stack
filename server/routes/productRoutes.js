
const express = require('express');
const { getAllProducts, createOrder } = require('../controllers/productController');

const router = express.Router();

router.get('/products', getAllProducts);  // Fetch all products and offers
router.post('/orders', createOrder);      // Submit an order

module.exports = router;
