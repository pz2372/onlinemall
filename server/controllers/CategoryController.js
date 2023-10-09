const mongoose = require("mongoose");
const Category = require("../models/category");

const getAll = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await Category.count();

    res.status(200).send({
      success: true,
      data: categories,
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
      const category = await Category.findOne({ _id });
      if (!category) {
        res
          .status(404)
          .send({ message: "Category not found.", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: category,
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
    const { name, description, path } = req.body;
    const newCategory = new Category({
      name,
      description,
      path,
      key: name.replaceAll(" ", "_").toUpperCase(),
      createdAt: new Date(),
      modifiedAt: new Date(),
      deletedAt: new Date(),
    });

    await newCategory.save();
    res
      .status(201)
      .send({ message: "Category created!", success: true, data: newCategory });
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
      const category = await Category.findOne(where);
      if (!category) {
        res
          .status(404)
          .send({ message: "Category not found.", success: false });
      } else {
        update.modifiedAt = new Date();
        const updatedCategory = await Category.findOneAndUpdate(where, update, {
          new: true,
        });

        res.status(200).send({
          message: "Category updated!",
          success: true,
          data: updatedCategory,
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
      const category = await Category.findOne({ _id });
      if (!category) {
        res.status(404).send({ message: "Category not found", success: false });
      } else {
        await Category.deleteOne({ _id: category._id });
        await Category.deleteMany({ parent: category._id });
        res.status(200).send({
          message: "Category deleted!",
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
