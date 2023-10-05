const express = require("express");
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const ColorController = require("../controllers/ColorController");
const colorRouter = express.Router();

colorRouter.get("/getAll", ColorController.getAll);
colorRouter.get("/getById/:id", ColorController.getById);
colorRouter.post("/create", isSuperAdmin, ColorController.create);
colorRouter.put("/update/:id", isSuperAdmin, ColorController.update);
colorRouter.delete("/delete/:id", isSuperAdmin, ColorController.deleteById);

module.exports = colorRouter;
