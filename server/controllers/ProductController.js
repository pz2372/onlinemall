const Product = require("../models/product");
const mongoose = require("mongoose");
const { S3DeleteImg, S3UploadImg } = require("../utils/s3");
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const products = await Product.find()
      .populate("sizes")
      .populate("colors")
      .populate({
        path: "brand",
        populate: {
          path: "categories",
        },
      })
      .populate("category")
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
      const product = await Product.findOne({ _id })
        .populate("sizes")
        .populate("colors")
        .populate({
          path: "brand",
          populate: {
            path: "categories",
          },
        })
        .populate("category");
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
    const { errors } = validationResult(req);
    if (errors.length) {
      res
        .status(500)
        .send({ message: "Validation failed.", error: errors, success: false });
    } else {
      const body = req.body;
      const images = req.files;
      let imageURLs = [];
      if (images.length) {
        images.forEach(async (image) => {
          let path = `products/${Date.now()}-${image.originalname}`;
          imageURLs.push(path);
          await S3UploadImg(path, image.buffer);
        });
      }
      const newProduct = new Product({
        name: body.name,
        description: body.description,
        SKU: body.SKU,
        price: body.price,
        sizes: body.sizes,
        colors: body.colors,
        images: imageURLs,
        brand: body.brand,
        category: body.category,
      });

      await newProduct.save();

      res
        .status(201)
        .send({ message: "Product created!", success: true, data: newProduct });
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
      const product = await Product.findOne(where);
      if (!product) {
        res.status(404).send({ message: "Product not found", success: false });
      } else {
        const images = req.files;
        if (images.length) {
          let imageURLs = [];
          if (product.images.length) {
            product.images.forEach(async (image) => {
              await S3DeleteImg(image);
            });
          }
          images.forEach(async (image) => {
            let path = `products/${Date.now()}-${image.originalname}`;
            imageURLs.push(path);
            await S3UploadImg(path, image.buffer);
          });
          update.images = imageURLs;
        }
        update.modifiedAt = new Date();
        const updatedProduct = await Product.findOneAndUpdate(where, update, {
          new: true,
        });

        res.status(200).send({
          message: "Product updated!",
          success: true,
          data: updatedProduct,
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
      const product = await Product.findOne({ _id });
      if (!product) {
        res.status(404).send({ message: "Product not found", success: false });
      } else {
        if (product.images.length) {
          product.images.forEach(async (image) => {
            await S3DeleteImg(image);
          });
        }
        await Product.deleteOne({ _id: product._id });
        res.status(200).send({
          message: "Product deleted!",
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
