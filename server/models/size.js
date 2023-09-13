const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
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

const Size = mongoose.model("Size", sizeSchema);

module.exports = Size;
