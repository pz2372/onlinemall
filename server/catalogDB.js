// const Product = require("./models/product");
// const Brand = require("./models/brand");
// const UserAddress = require("./models/userAddress");
const { S3UploadImg, S3GetImg, checkS3Connection } = require("./s3");

// const mongoose = require("mongoose");
// // mongoose.connect("mongodb+srv://siilkcompany:wAhhBZ6PLJGcYqqP@cluster0.a0hsbwz.mongodb.net/?retryWrites=true&w=majority",
// // { useNewUrlParser: true, useUNifiedTopology: true });
// mongoose.connect("mongodb://127.0.0.1:27017", {
//   useNewUrlParser: true,
//   useUNifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error"));
// db.once("open", () => {
//   console.log("Connected to MongoDB!");
// });

const uploadProduct = async (req, res) => {
  const productInfoArray = req.body;
  console.log(productInfoArray);
  const currentDate = new Date();
  const newProducts = productInfoArray.map((productInfo) => ({
    name: productInfo.name,
    description: productInfo.description,
    SKU: productInfo.SKU,
    link: productInfo.link,
    price: productInfo.price,
    brandID: productInfo.brandID,
    categoryID: productInfo.categoryID,
    createdAt: currentDate,
    modifiedAt: currentDate, // Set modifiedAt to the same value as createdAt initially
  }));

  try {
    const savedProducts = await Product.insertMany(newProducts);
    console.log("Products saved:", savedProducts);

    for (var i = 0; i < productInfoArray.length; i++) {
      S3UploadImg(
        `onlinemallroot/products/${savedProducts._id}`,
        productInfoArray[i].images
      );
    }

    res.status(201).json({ message: "Products uploaded successfully" });
  } catch (err) {
    console.error("Error while uploading Products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDashboardProducts = (req, res) => {
  Product.find({ brand: req.brand, category: req.category })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const createBrand = (req, res) => {
  const brandInfo = req.body;
  const currentDate = new Date();
  const newBrand = new Brand({
    name: brandInfo.name,
    description: brandInfo.description,
    price: brandInfo.price,
    categoryID: brandInfo.categoryID,
    createdAt: currentDate,
    modifiedAt: currentDate, // Set modifiedAt to the same value as createdAt initially
  });

  newBrand
    .save()
    .then((savedBrand) => {
      console.log("Brand saved:", savedBrand);
      res.status(201).json({ message: "Brand created successfully" });
    })
    .catch((err) => {
      console.log("Error while creating Brand:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}, "name");
    const brandNames = brands.map((brand) => brand.name);
    res.json(brandNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  uploadProduct: uploadProduct,
  getDashboardProducts: getDashboardProducts,
  createBrand: createBrand,
  getAllBrands: getAllBrands,
};
