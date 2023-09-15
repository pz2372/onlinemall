const express = require("express");
const auth = require("../middlewares/authenticate");
const CategoryController = require("../controllers/CategoryController");
const categoryRouter = express.Router();

categoryRouter.get("/getAll", CategoryController.getAll);
categoryRouter.get("/getById/:id", CategoryController.getById);
categoryRouter.post("/create", auth, CategoryController.create);
categoryRouter.put("/update/:id", auth, CategoryController.update);
categoryRouter.delete("/delete/:id", auth, CategoryController.deleteById);

module.exports = categoryRouter;
