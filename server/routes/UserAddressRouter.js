const express = require("express");
const UserAddressController = require("../controllers/UserAddressController");
const userAddressRouter = express.Router();

userAddressRouter.get("/getAllByUser/:id", UserAddressController.getAllByUser);
userAddressRouter.get("/getById/:id", UserAddressController.getById);
userAddressRouter.post("/create", UserAddressController.create);
userAddressRouter.post("/update/:id", UserAddressController.update);
userAddressRouter.post("/delete/:id", UserAddressController.deleteById);

module.exports = userAddressRouter;
