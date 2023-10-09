const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Admin = require("../models/admin");

const me = async (req, res) => {
  try {
    const { email } = req.user;
    const admin = await Admin.findOne({ email })
      .select("name email role brand")
      .populate({
        path: "brand",
        populate: {
          path: "categories",
        },
      });
    if (!admin) {
      res.status(404).send({ message: "Admin not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: admin,
      });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const getAll = async (req, res) => {
  try {
    const { page = 1, limit } = req.query;
    const admins = await Admin.find({ role: { $ne: "SUPERADMIN" } })
      .select("name email role brand")
      .populate({
        path: "brand",
        populate: {
          path: "categories",
        },
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await Admin.count();

    res.status(200).send({
      success: true,
      data: admins,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
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
      const admin = await Admin.findOne(where);
      if (!admin) {
        res.status(404).send({ message: "Admin not found", success: false });
      } else {
        update.modifiedAt = new Date();
        const updateAdmin = await Admin.findOneAndUpdate(where, update, {
          new: true,
        });

        const updatedAdmin = await Admin.findOne({
          _id: updateAdmin._id,
        })
          .select("name email role brand")
          .populate({
            path: "brand",
            populate: {
              path: "categories",
            },
          });

        res.status(200).send({
          message: "Admin updated!",
          success: true,
          data: updatedAdmin,
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
      const admin = await Admin.findOne({ _id });
      if (!admin) {
        res.status(404).send({ message: "Admin not found", success: false });
      } else {
        await Admin.deleteOne({ _id: admin._id });
        res.status(200).send({
          message: "Admin deleted!",
          success: true,
          _id: admin._id,
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
  me,
  getAll,
  update,
  deleteById,
};
