const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  SKU: Number,
  brandID: Number,
  categoryID: Number,
  createdAt: Date,
  modifiedAt: Date,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
