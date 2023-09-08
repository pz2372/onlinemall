const express = require("express");
const auth = require("../middlewares/authenticate");
const UserAddressController = require("../controllers/UserAddressController");
const userAddressRouter = express.Router();

userAddressRouter.get(
  "/getAllByUser/:id",
  auth,
  UserAddressController.getAllByUser
);
userAddressRouter.get("/getById/:id", auth, UserAddressController.getById);
userAddressRouter.post("/create", auth, UserAddressController.create);
userAddressRouter.put("/update/:id", auth, UserAddressController.update);
userAddressRouter.post("/delete/:id", auth, UserAddressController.deleteById);

module.exports = userAddressRouter;
