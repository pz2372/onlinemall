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

require("dotenv").config();

connectDB();

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

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
