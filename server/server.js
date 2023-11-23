const express = require("express");
const app = express();
const connectDB = require("./config/database");
const adminRoutes = require("./routes/AdminRouter");
const authRoutes = require("./routes/AuthRouter");
const brandRoutes = require("./routes/BrandRouter");
const userRoutes = require("./routes/UserRouter");
const userAddressRoutes = require("./routes/UserAddressRouter");
const categoryRoutes = require("./routes/CategoryRouter");
const productRoutes = require("./routes/ProductRouter");
const colorRouter = require("./routes/ColorRouter");
const sizeRouter = require("./routes/SizeRouter");
const paymentRouter = require("./routes/PaymentRouter");
const webHookController = require("./controllers/WebHookController");

require("dotenv").config();

connectDB();

// need to be added before parsing the body to json
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webHookController.stripeHandler
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/user", userRoutes);
app.use("/api/userAddress", userAddressRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/color", colorRouter);
app.use("/api/size", sizeRouter);
app.use("/api/payment", paymentRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
