const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/authenticate");
const UserController = require("../controllers/UserController");
const userRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

userRouter.get("/me", auth, UserController.me);
userRouter.get("/getAll", auth, UserController.getAll);
userRouter.get("/getById/:id", auth, UserController.getById);
userRouter.put(
  "/update/:id",
  auth,
  upload.single("avatar"),
  UserController.update
);
userRouter.delete("/delete/:id", auth, UserController.deleteById);

module.exports = userRouter;
