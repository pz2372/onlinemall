const express = require("express");
const BrandController = require("../controllers/BrandController");
const brandRouter = express.Router();

brandRouter.get("/getAll", BrandController.getAll);
brandRouter.post("/create", BrandController.create);

module.exports = brandRouter;
