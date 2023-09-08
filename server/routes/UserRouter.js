const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/authenticate");
const UserController = require("../controllers/UserController");
const userRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

userRouter.get("/getAll", auth, UserController.getAll);
userRouter.get("/getById/:id", auth, UserController.getById);
userRouter.put(
  "/update/:id",
  auth,
  upload.single("avatar"),
  UserController.update
);
userRouter.post("/delete/:id", auth, UserController.deleteById);

module.exports = userRouter;
