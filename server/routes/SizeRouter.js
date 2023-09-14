const express = require("express");
const auth = require("../middlewares/authenticate");
const SizeController = require("../controllers/SizeController");
const sizeRouter = express.Router();

sizeRouter.get("/getAll", auth, SizeController.getAll);
sizeRouter.get("/getById/:id", auth, SizeController.getById);
sizeRouter.post("/create", auth, SizeController.create);
sizeRouter.put("/update/:id", auth, SizeController.update);
sizeRouter.delete("/delete/:id", auth, SizeController.deleteById);

module.exports = sizeRouter;