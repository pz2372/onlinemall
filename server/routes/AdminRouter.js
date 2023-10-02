const express = require("express");
const AdminController = require("../controllers/AdminController");
const adminRouter = express.Router();
const auth = require("../middlewares/authenticate");

adminRouter.get("/me", auth, AdminController.me);

module.exports = adminRouter;
