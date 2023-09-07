const express = require("express");
const AuthController = require("../controllers/AuthController");
const { body } = require("express-validator");
const authRouter = express.Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 characters."),
  ],
  AuthController.login
);

module.exports = authRouter;
