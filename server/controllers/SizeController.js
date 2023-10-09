const mongoose = require("mongoose");
const Size = require("../models/size");

const getAll = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const sizes = await Size.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await Size.count();

    res.status(200).send({
      success: true,
      data: sizes,
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
      const size = await Size.findOne({ _id });
      if (!size) {
        res.status(404).send({ message: "Size not found.", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: size,
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
    const { name } = req.body;
    const newSize = new Size({
      name,
      createdAt: new Date(),
      modifiedAt: new Date(),
      deletedAt: new Date(),
    });

    await newSize.save();
    res
      .status(201)
      .send({ message: "Size created!", success: true, data: newSize });
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
      const size = await Size.findOne(where);
      if (!size) {
        res.status(404).send({ message: "Size not found.", success: false });
      } else {
        update.modifiedAt = new Date();
        const updatedSize = await Size.findOneAndUpdate(where, update, {
          new: true,
        });

        res.status(200).send({
          message: "Size updated!",
          success: true,
          data: updatedSize,
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
      const size = await Size.findOne({ _id });
      if (!size) {
        res.status(404).send({ message: "Size not found", success: false });
      } else {
        await Size.deleteOne({ _id: size._id });
        res.status(200).send({
          message: "Size deleted!",
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
  create,
  update,
  deleteById,
};
