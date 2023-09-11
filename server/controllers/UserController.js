const User = require("../models/user");
const mongoose = require("mongoose");
const UserAddress = require("../models/userAddress");
const { S3DeleteImg, S3UploadImg } = require("../s3");

const getAll = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await User.count();

    res.status(200).send({
      success: true,
      data: users,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
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
      const user = await User.findOne({ _id });
      if (!user) {
        res.status(404).send({ message: "User not found", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: user,
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

const update = async (req, res) => {
  try {
    const _id = req.params?.id;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const where = { _id };
      let update = req.body;
      const user = await User.findOne(where);
      if (!user) {
        res.status(404).send({ message: "User not found", success: false });
      } else {
        const avatar = req.file;
        if (avatar) {
          let avatarUrl = "";
          if (user.avatar) {
            await S3DeleteImg(user.avatar);
          }
          avatarUrl = `users/${Date.now()}-${avatar.originalname}`;
          await S3UploadImg(avatarUrl, avatar.buffer);
          update.avatar = avatarUrl;
        }
        update.modifiedAt = new Date();
        const updatedUser = await User.findOneAndUpdate(where, update, {
          new: true,
        });

        res.status(200).send({
          message: "User updated!",
          success: true,
          data: updatedUser,
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
      const user = await User.findOne({ _id });
      if (!user) {
        res.status(404).send({ message: "User not found", success: false });
      } else {
        await User.deleteOne({ _id: user._id });
        await UserAddress.deleteMany({ user: user._id });
        res.status(200).send({
          message: `User ${user.username} deleted!`,
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
  getAll,
  getById,
  update,
  deleteById,
};
