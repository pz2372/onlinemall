const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Brand = require("../models/brand");
const Product = require("../models/product");
const Admin = require("../models/admin");
const { S3UploadImg, S3DeleteImg } = require("../utils/s3");

const getAll = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const brands = await Brand.find()
      .populate("categories")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await Brand.count();

    res.status(200).send({
      success: true,
      data: brands,
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
      const brand = await Brand.findOne({ _id }).populate("categories");
      if (!brand) {
        res.status(404).send({ message: "Brand not found", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: brand,
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
      const { name, description, categories, website } = req.body;
      const logo = req.file;
      let logoUrl = "";
      if (logo) {
        logoUrl = `brands/${Date.now()}-${logo.originalname}`;
        await S3UploadImg(logoUrl, logo.buffer, 100);
      }
      const newBrand = new Brand({
        name,
        description,
        logo: logoUrl,
        categories,
        website,
        createdAt: new Date(),
        modifiedAt: new Date(),
        deletedAt: new Date(),
      });

      await newBrand.save();

      const brand = await Brand.findOne({ _id: newBrand._id }).populate(
        "categories"
      );

      res
        .status(201)
        .send({ message: "Brand created!", success: true, data: brand });
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
      if (update.logo == "null") {
        update.logo = null;
      }
      const brand = await Brand.findOne(where);
      if (!brand) {
        res.status(404).send({ message: "Brand not found", success: false });
      } else {
        const logo = req.file;
        if (logo) {
          let logoUrl = "";
          await S3DeleteImg(brand.logo);
          logoUrl = `brands/${Date.now()}-${logo.originalname}`;
          await S3UploadImg(logoUrl, logo.buffer, 100);
          update.logo = logoUrl;
        } else if (!update.logo && brand.logo) {
          await S3DeleteImg(brand.logo);
        }
        update.modifiedAt = new Date();
        const updateBrand = await Brand.findOneAndUpdate(where, update, {
          new: true,
        });

        const updatedBrand = await Brand.findOne({
          _id: updateBrand._id,
        }).populate("categories");

        res.status(200).send({
          message: "Brand updated!",
          success: true,
          data: updatedBrand,
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
      const brand = await Brand.findOne({ _id });
      if (!brand) {
        res.status(404).send({ message: "Brand not found", success: false });
      } else {
        if (brand.logo) {
          await S3DeleteImg(brand.logo);
        }
        await Brand.deleteOne({ _id: brand._id });
        await Product.deleteMany({ brand: brand._id });
        await Admin.deleteMany({ brand: brand._id });
        res.status(200).send({
          message: "Brand deleted!",
          success: true,
          _id: brand._id,
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
