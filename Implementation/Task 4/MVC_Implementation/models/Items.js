const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  firmName: String,
  price: Number,
  quantity: Number,
  expiryDate: Date,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
