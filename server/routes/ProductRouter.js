const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/authenticate");
const ProductController = require("../controllers/ProductController");
const productRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

productRouter.get("/getAll", auth, ProductController.getAll);
productRouter.get("/getById/:id", auth, ProductController.getById);
productRouter.post(
  "/create",
  auth,
  upload.array("images"),
  ProductController.create
);

module.exports = productRouter;
