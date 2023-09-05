const bcrypt = require("bcrypt");
const User = require("../models/user");

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
    const user = new User({
      username,
      firstName,
      lastName,
      email,
      phone,
      password: hashPassword,
      role,
      gender,
    });
    await user.save();
    res.status(200).send({ message: "User created!" });
  } catch (e) {
    res.status(500).send({ message: e.message, error: e.errors });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // res.status(200).send({ message: "User created!" });
  } catch (e) {
    res.status(500).send({ message: e.message, error: e.errors });
  }
};

module.exports = {
  signup,
  login,
};
