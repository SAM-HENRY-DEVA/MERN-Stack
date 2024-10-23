
const Product = require('../models/Product');
const Order = require('../models/Order');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  const { items, totalBill } = req.body;
  try {
    const order = new Order({ items, totalBill });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllProducts, createOrder };
