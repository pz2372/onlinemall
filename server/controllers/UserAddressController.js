const User = require("../models/user");
const mongoose = require("mongoose");
const UserAddress = require("../models/userAddress");

const getAllByUser = async (req, res) => {
  try {
    const _id = req.params?.id;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const addresses = await UserAddress.find({ user: _id });
      if (!addresses.length) {
        res.status(404).send({
          message: "User does not have any address saved.",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: addresses,
        });
      }
    } else {
      res.status(500).send({ message: "Invalid id provided.", success: false });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const getById = async (req, res) => {
  try {
    const _id = req.params?.id;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const address = await UserAddress.findOne({ _id });
      if (!address) {
        res.status(404).send({ message: "Address not found", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: address,
        });
      }
    } else {
      res.status(500).send({ message: "Invalid id provided.", success: false });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const create = async (req, res) => {
  try {
    const { user, addressLine, city, state, zipCode, country } = req.body;
    if (mongoose.Types.ObjectId.isValid(user)) {
      const userExists = await User.findOne({ _id: user });
      if (!userExists) {
        res.status(404).send({ message: "User not found", success: false });
      } else {
        const newAddress = new UserAddress({
          user,
          addressLine,
          city,
          state,
          zipCode,
          country,
          createdAt: new Date(),
          modifiedAt: new Date(),
          deletedAt: new Date(),
        });
        await newAddress.save();
        res.status(200).send({
          message: "Address created!",
          success: true,
          data: newAddress,
        });
      }
    } else {
      res
        .status(500)
        .send({ message: "Please provide user id.", success: false });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const update = async (req, res) => {
  try {
    const _id = req.params?.id;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const where = { _id };
      let update = req.body;
      const address = await UserAddress.findOne(where);
      if (!address) {
        res.status(404).send({ message: "Address not found", success: false });
      } else {
        update.modifiedAt = new Date();
        const updatedAddress = await UserAddress.findOneAndUpdate(
          where,
          update,
          {
            new: true,
          }
        );

        res.status(200).send({
          message: "Address updated!",
          success: true,
          data: updatedAddress,
        });
      }
    } else {
      res.status(500).send({ message: "Invalid id provided.", success: false });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const deleteById = async (req, res) => {
  try {
    const _id = req.params?.id;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const address = await UserAddress.findOne({ _id });
      if (!address) {
        res.status(404).send({ message: "Address not found", success: false });
      } else {
        await UserAddress.deleteOne({ _id: address._id });
        res.status(200).send({
          message: `Address deleted!`,
          success: true,
        });
      }
    } else {
      res.status(500).send({ message: "Invalid id provided.", success: false });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

module.exports = {
  getAllByUser,
  getById,
  create,
  update,
  deleteById,
};
