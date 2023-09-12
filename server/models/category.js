const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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
  key: {
    type: String,
    default: null,
  },
  path: {
    type: String,
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

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
