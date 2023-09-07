const express = require("express");
const multer = require("multer");
const UserController = require("../controllers/UserController");
const userRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

userRouter.get("/getAll", UserController.getAll);
userRouter.get("/getById/:id", UserController.getById);
userRouter.post("/update/:id", upload.single("avatar"), UserController.update);
userRouter.post("/delete/:id", UserController.deleteById);

module.exports = userRouter;
