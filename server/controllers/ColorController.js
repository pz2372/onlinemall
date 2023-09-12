const mongoose = require("mongoose");
const Color = require("../models/color");

const getAll = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const colors = await Color.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await Color.count();

    res.status(200).send({
      success: true,
      data: colors,
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
      const color = await Color.findOne({ _id });
      if (!color) {
        res.status(404).send({ message: "Color not found.", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: color,
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
    const { name, hex } = req.body;
    const newColor = new Color({
      name,
      hex,
    });

    await newColor.save();
    res
      .status(201)
      .send({ message: "Color created!", success: true, data: newColor });
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
      const color = await Color.findOne(where);
      if (!color) {
        res.status(404).send({ message: "Color not found.", success: false });
      } else {
        update.modifiedAt = new Date();
        const updatedColor = await Color.findOneAndUpdate(where, update, {
          new: true,
        });

        res.status(200).send({
          message: "Color updated!",
          success: true,
          data: updatedColor,
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
      const color = await Color.findOne({ _id });
      if (!color) {
        res.status(404).send({ message: "Color not found", success: false });
      } else {
        await Color.deleteOne({ _id: color._id });
        res.status(200).send({
          message: "Color deleted!",
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
