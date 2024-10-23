
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      discount: Number,
      offer: String,
    },
  ],
  totalBill: Number,
});

module.exports = mongoose.model('Order', orderSchema);
