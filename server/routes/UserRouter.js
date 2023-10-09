const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/authenticate");
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const UserController = require("../controllers/UserController");
const userRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

userRouter.get("/me", auth, UserController.me);
userRouter.get("/getAll", isSuperAdmin, UserController.getAll);
userRouter.get("/getById/:id", isSuperAdmin, UserController.getById);
userRouter.put(
  "/update/:id",
  isSuperAdmin,
  upload.single("avatar"),
  UserController.update
);
userRouter.delete("/delete/:id", isSuperAdmin, UserController.deleteById);

module.exports = userRouter;
