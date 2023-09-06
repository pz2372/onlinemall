const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema({
  addressLine: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  createdAt: Date,
  modifiedAt: Date,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

const UserAddress = mongoose.model("UserAddress", userAddressSchema);

module.exports = UserAddress;
