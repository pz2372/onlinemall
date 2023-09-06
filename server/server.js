const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const catalogDB = require("./catalogDB");
const authRoutes = require("./routes/auth");
const brandRoutes = require("./routes/brand");
const userRoutes = require("./routes/user");

require("dotenv").config();

// const multer = require("multer");
// const upload = multer({
//   storage: multer.memoryStorage(), // save files in memory as Buffers
// });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUNifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

app.use(express.json());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

app.use("/auth", authRoutes);
app.use("/brand", brandRoutes);
app.use("/user", userRoutes);

// app.post("/uploadProduct", catalogDB.uploadProduct);
// app.get("/getDashboardProducts", catalogDB.getDashboardProducts);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
