const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Brand = require("../models/brand");
const { S3UploadImg, S3DeleteImg } = require("../s3");

const getAll = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).send({
      success: true,
      data: brands,
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
      const brand = await Brand.findOne({ _id });
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
      const { name, description } = req.body;
      const logo = req.file;
      let logoUrl = "";
      if (logo) {
        logoUrl = `brands/${Date.now()}-${logo.originalname}`;
        await S3UploadImg(logoUrl, logo.buffer);
      }
      const newBrand = new Brand({
        name,
        description,
        logo: logoUrl,
      });

      await newBrand.save();
      res
        .status(201)
        .send({ message: "Brand created!", success: true, data: newBrand });
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
      const brand = await Brand.findOne(where);
      if (!brand) {
        res.status(404).send({ message: "Brand not found", success: false });
      } else {
        const logo = req.file;
        let logoUrl = "";
        if (logo) {
          await S3DeleteImg(brand.logo);
          logoUrl = `brands/${Date.now()}-${logo.originalname}`;
          await S3UploadImg(logoUrl, logo.buffer);
          update.logo = logoUrl;
        }
        update.modifiedAt = new Date();
        const updatedBrand = await Brand.findOneAndUpdate(where, update, {
          new: true,
        });

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
        res.status(200).send({
          message: "Brand deleted!",
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
