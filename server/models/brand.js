const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    default: null,
  },
  description: {
    type: String,
    required: false,
    default: null,
  },
  logo: {
    type: String,
    required: false,
    default: null,
  },
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

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
