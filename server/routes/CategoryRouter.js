const express = require("express");
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const CategoryController = require("../controllers/CategoryController");
const categoryRouter = express.Router();

categoryRouter.get("/getAll", CategoryController.getAll);
categoryRouter.get("/getById/:id", CategoryController.getById);
categoryRouter.post("/create", isSuperAdmin, CategoryController.create);
categoryRouter.put("/update/:id", isSuperAdmin, CategoryController.update);
categoryRouter.delete(
  "/delete/:id",
  isSuperAdmin,
  CategoryController.deleteById
);

module.exports = categoryRouter;
