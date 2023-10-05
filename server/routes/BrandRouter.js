const express = require("express");
const multer = require("multer");
const BrandController = require("../controllers/BrandController");
const { body } = require("express-validator");
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const brandRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

brandRouter.get("/getAll", BrandController.getAll);
brandRouter.get("/getById/:id", BrandController.getById);
brandRouter.post(
  "/create",
  isSuperAdmin,
  upload.single("logo"),
  [body("name").notEmpty().withMessage("Name is required.")],
  BrandController.create
);
brandRouter.put(
  "/update/:id",
  isSuperAdmin,
  upload.single("logo"),
  BrandController.update
);
brandRouter.delete("/delete/:id", isSuperAdmin, BrandController.deleteById);

module.exports = brandRouter;
