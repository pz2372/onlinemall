const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const { sendMail } = require("../utils/sendMail");
const { generatePassword } = require("../utils/generatePassword");
const Admin = require("../models/admin");

const signup = async (req, res) => {
  try {
    const { username, firstName, lastName, email, phone, password, gender } =
      req.body;
    let hashPassword = password;
    if (password && password.length >= 8) {
      hashPassword = await bcrypt.hash(password, 10);
    }
    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      phone,
      password: hashPassword,
      gender,
      createdAt: new Date(),
      modifiedAt: new Date(),
      deletedAt: new Date(),
    });
    await newUser.save();
    res.status(201).send({ message: "User created!", success: true });
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length) {
      const err = errors.filter(
        (v, i, a) => a.findIndex((v2) => v2.path === v.path) === i
      );
      res
        .status(500)
        .send({ message: "Validation failed.", error: err, success: false });
    } else {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).send({ message: "User not found!", success: false });
      } else {
        const hashedPassword = user.password;
        if (await bcrypt.compare(password, hashedPassword)) {
          const tokenPayload = {
            email: user.email,
            role: user.role,
          };
          const accessToken = jwt.sign(
            tokenPayload,
            process.env.ACCESS_TOKEN_SECRET
          );
          res.status(200).send({
            message: "You have successfully logged In.",
            success: true,
            accessToken,
          });
        } else {
          res
            .status(500)
            .send({ message: "Password is incorrect.", success: false });
        }
      }
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = req.body;
    if (!user?.email) {
      res.status(500).send({
        message: "Please provide your email address.",
        success: false,
      });
    } else {
      const { errors } = validationResult(req);
      if (errors.length) {
        res.status(500).send({
          message: "Validation failed.",
          error: errors,
          success: false,
        });
      } else {
        try {
          const newPassword = generatePassword();
          const mailOptions = {
            from: `"Siilk" <${process.env.NODEMAILER_USER}>`,
            to: user.email,
            subject: "Password reset",
            html: `Your new password is:  <b style="font-size: 20px">${newPassword}</b>`,
          };
          await sendMail(mailOptions);
          let hashPassword = await bcrypt.hash(newPassword, 10);
          await User.findOneAndUpdate(
            { email: user.email },
            { password: hashPassword },
            {
              new: true,
            }
          );
          res.send({
            message: "Your new password has been sent to your email.",
            success: true,
          });
        } catch (e) {
          res
            .status(500)
            .send({ message: e.message, error: e.errors, success: false });
        }
      }
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length) {
      const err = errors.filter(
        (v, i, a) => a.findIndex((v2) => v2.path === v.path) === i
      );
      res
        .status(500)
        .send({ message: "Validation failed.", error: err, success: false });
    } else {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin) {
        res.status(404).send({ message: "Admin not found!", success: false });
      } else {
        const hashedPassword = admin.password;
        if (await bcrypt.compare(password, hashedPassword)) {
          const tokenPayload = {
            email: admin.email,
            role: admin.role,
          };
          const accessToken = jwt.sign(
            tokenPayload,
            process.env.ACCESS_TOKEN_SECRET
          );
          res.status(200).send({
            message: "You have successfully logged In.",
            success: true,
            accessToken,
          });
        } else {
          res
            .status(500)
            .send({ message: "Password is incorrect.", success: false });
        }
      }
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const adminCreate = async (req, res) => {
  try {
    const { name, email, password, role, brand } = req.body;
    let hashPassword = password;
    if (password && password.length >= 8) {
      hashPassword = await bcrypt.hash(password, 10);
    }
    const newAdmin = new Admin({
      name,
      email,
      password: hashPassword,
      role,
      brand,
      createdAt: new Date(),
      modifiedAt: new Date(),
      deletedAt: new Date(),
    });
    await newAdmin.save();

    const admin = await Admin.findOne({ _id: newAdmin._id }).populate("brand");

    res
      .status(201)
      .send({ message: "Admin created!", success: true, data: admin });
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

module.exports = {
  signup,
  login,
  resetPassword,
  adminLogin,
  adminCreate,
};
