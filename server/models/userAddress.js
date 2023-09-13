const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema({
  addressLine: {
    type: String,
    required: [true, "Address is required."],
    default: null,
  },
  city: {
    type: String,
    required: [true, "City is required."],
    default: null,
  },
  state: {
    type: String,
    required: false,
    default: null,
  },
  zipCode: {
    type: String,
    required: [true, "Zip Code is required."],
    default: null,
  },
  country: {
    type: String,
    required: [true, "Country is required."],
    default: null,
  },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
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

const UserAddress = mongoose.model("UserAddress", userAddressSchema);

module.exports = UserAddress;
