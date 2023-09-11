const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    default: null,
  },
  hex: {
    type: String,
    required: [true, "Hex is required."],
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

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;
