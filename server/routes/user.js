const express = require("express");
const UserController = require("../controllers/UserController");
const userRouter = express.Router();

userRouter.post("/createAddress", UserController.createAddress);

module.exports = userRouter;
