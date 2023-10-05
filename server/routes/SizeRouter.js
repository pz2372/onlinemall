const express = require("express");
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const SizeController = require("../controllers/SizeController");
const sizeRouter = express.Router();

sizeRouter.get("/getAll", SizeController.getAll);
sizeRouter.get("/getById/:id", SizeController.getById);
sizeRouter.post("/create", isSuperAdmin, SizeController.create);
sizeRouter.put("/update/:id", isSuperAdmin, SizeController.update);
sizeRouter.delete("/delete/:id", isSuperAdmin, SizeController.deleteById);

module.exports = sizeRouter;
