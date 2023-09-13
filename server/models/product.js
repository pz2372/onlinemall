const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  SKU: String,
  price: Number,
  sizes: [{ type: mongoose.Types.ObjectId, ref: "Size" }],
  colors: [{ type: mongoose.Types.ObjectId, ref: "Color" }],
  images: [],
  brand: { type: mongoose.Types.ObjectId, ref: "Brand" },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  inventoryID: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
