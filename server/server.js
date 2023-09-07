const express = require("express");
const app = express();
const authRoutes = require("./routes/AuthRouter");
const brandRoutes = require("./routes/BrandRouter");
const userRoutes = require("./routes/UserRouter");
const userAddressRoutes = require("./routes/UserAddressRouter");
const categoryRoutes = require("./routes/CategoryRouter");
const connectDB = require("./config/database");

require("dotenv").config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/user", userRoutes);
app.use("/api/userAddress", userAddressRoutes);
app.use("/api/category", categoryRoutes);

// app.post("/uploadProduct", catalogDB.uploadProduct);
// app.get("/getDashboardProducts", catalogDB.getDashboardProducts);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
