const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/authenticate");
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const ProductController = require("../controllers/ProductController");
const { body } = require("express-validator");
const productRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

productRouter.get("/getAll", ProductController.getAll);
productRouter.post(
  "/getProductsByCategoryWithBrands",
  ProductController.getProductsByCategoryWithBrands
);
productRouter.get("/getById/:id", ProductController.getById);
productRouter.post("/getProductsByBrand", ProductController.getProductsByBrand);
productRouter.post("/addReview", auth, ProductController.addReview);
productRouter.post(
  "/create",
  isSuperAdmin,
  upload.array("images", 50),
  [
    body("name").notEmpty().withMessage("Name is required."),
    body("SKU").notEmpty().withMessage("SKU is required."),
    body("price").notEmpty().withMessage("Price is required."),
    body("sizes").notEmpty().withMessage("Please add a size."),
    body("colors").notEmpty().withMessage("Please add a color."),
    body("brand").notEmpty().withMessage("Please add a brand."),
    body("category").notEmpty().withMessage("Please add a category."),
  ],
  ProductController.create
);
productRouter.put(
  "/update/:id",
  isSuperAdmin,
  upload.array("images", 50),
  ProductController.update
);
productRouter.delete("/delete/:id", isSuperAdmin, ProductController.deleteById);

module.exports = productRouter;
