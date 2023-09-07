const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const signup = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      gender,
    } = req.body;
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
      role,
      gender,
    });
    await newUser.save();
    res
      .status(201)
      .send({ message: "User created!", success: true, data: newUser });
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

        if (bcrypt.compare(password, hashedPassword)) {
          const tokenPayload = {
            email: user.email,
          };
          const accessToken = jwt.sign(
            tokenPayload,
            process.env.ACCESS_TOKEN_SECRET
          );
          res.status(200).send({
            message: "User Logged In!",
            success: true,
            data: {
              accessToken,
            },
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

module.exports = {
  signup,
  login,
};
