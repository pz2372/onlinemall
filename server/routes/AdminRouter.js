const express = require("express");
const AdminController = require("../controllers/AdminController");
const adminRouter = express.Router();
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const isAdmin = require("../middlewares/isAdmin");

adminRouter.get("/me", isAdmin, AdminController.me);
adminRouter.get("/getAll", isSuperAdmin, AdminController.getAll);
adminRouter.put("/update/:id", isSuperAdmin, AdminController.update);
adminRouter.delete("/delete/:id", isSuperAdmin, AdminController.deleteById);

module.exports = adminRouter;
