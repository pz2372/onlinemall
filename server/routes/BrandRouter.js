const express = require("express");
const multer = require("multer");
const BrandController = require("../controllers/BrandController");
const { body } = require("express-validator");
const auth = require("../middlewares/authenticate");
const brandRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

brandRouter.get("/getAll", auth, BrandController.getAll);
brandRouter.get("/getById/:id", auth, BrandController.getById);
brandRouter.post(
  "/create",
  auth,
  upload.single("logo"),
  [body("name").notEmpty().withMessage("Name is required.")],
  BrandController.create
);
brandRouter.put(
  "/update/:id",
  auth,
  upload.single("logo"),
  BrandController.update
);
brandRouter.post("/delete/:id", auth, BrandController.deleteById);

module.exports = brandRouter;
