const express = require("express");
const auth = require("../middlewares/authenticate");
// const isSuperAdmin = require("../middlewares/isSuperAdmin");
const PaymentController = require("../controllers/PaymentController");
const paymentRouter = express.Router();

paymentRouter.post(
  "/create-checkout-session",
  auth,
  PaymentController.createCheckoutSession
);

module.exports = paymentRouter;
