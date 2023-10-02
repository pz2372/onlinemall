const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Admin = require("../models/admin");

const me = async (req, res) => {
  try {
    const { email } = req.user;
    const admin = await Admin.findOne({ email }).select("name email");
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

module.exports = {
  me,
};
