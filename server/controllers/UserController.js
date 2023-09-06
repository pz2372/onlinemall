const User = require("../models/user");
const UserAddress = require("../models/userAddress");

const createAddress = async (req, res) => {
  try {
    const { user, addressLine, city, state, zipCode, country } = req.body;
    const address = new UserAddress({
      user,
      addressLine,
      city,
      state,
      zipCode,
      country,
    });
    await address.save();
    res.status(200).send({ message: "Address created!" });
  } catch (e) {
    res.status(500).send({ message: e.message, error: e.errors });
  }
};

module.exports = {
  createAddress,
};
