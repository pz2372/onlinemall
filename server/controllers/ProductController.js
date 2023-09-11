const Product = require("../models/product");
const mongoose = require("mongoose");
const { S3DeleteImg, S3UploadImg } = require("../s3");

const getAll = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await Product.count();

    res.status(200).send({
      success: true,
      data: products,
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
      const product = await Product.findOne({ _id });
      if (!product) {
        res.status(404).send({ message: "Product not found.", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: product,
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
    const body = req.body;
    const images = req.files;
    res.send({ images, body });
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
};
