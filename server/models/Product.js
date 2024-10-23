// server/models/Product.js
const mongoose = require('mongoose');

// Define a schema for offers
const offerSchema = new mongoose.Schema({
  type: {
    type: String, // 'flat', 'percentage', or 'product'
    enum: ['flat', 'percentage', 'product'], // Validating offer types
    required: true,
  },
  discountValue: {
    type: Number, // Discount value (either flat amount or percentage)
    default: 0,
  },
  freeProduct: {
    type: mongoose.Schema.Types.ObjectId, // If 'product', this references another product
    ref: 'Product',
    default: null,
  },
});

// Define a schema for products
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offers: [offerSchema], // Embedding the offer schema as an array
});

module.exports = mongoose.model('Product', productSchema);
