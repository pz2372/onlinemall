const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const categoryRouter = express.Router();

categoryRouter.get("/getAll", CategoryController.getAll);
categoryRouter.get("/getById/:id", CategoryController.getById);
categoryRouter.post("/create", CategoryController.create);
categoryRouter.post("/update/:id", CategoryController.update);
categoryRouter.post("/delete/:id", CategoryController.deleteById);

module.exports = categoryRouter;
