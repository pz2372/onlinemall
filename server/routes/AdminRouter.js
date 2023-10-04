const express = require("express");
const AdminController = require("../controllers/AdminController");
const adminRouter = express.Router();
const auth = require("../middlewares/authenticate");

adminRouter.get("/me", auth, AdminController.me);
adminRouter.get("/getAll", auth, AdminController.getAll);

module.exports = adminRouter;
