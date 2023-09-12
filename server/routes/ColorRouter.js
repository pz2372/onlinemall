const express = require("express");
const auth = require("../middlewares/authenticate");
const ColorController = require("../controllers/ColorController");
const colorRouter = express.Router();

colorRouter.get("/getAll", auth, ColorController.getAll);
colorRouter.get("/getById/:id", auth, ColorController.getById);
colorRouter.post("/create", auth, ColorController.create);
colorRouter.put("/update/:id", auth, ColorController.update);
colorRouter.delete("/delete/:id", auth, ColorController.deleteById);

module.exports = colorRouter;
