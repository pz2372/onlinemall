const { S3UploadImg, S3GetImg, checkS3Connection } = require("./s3");

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

module.exports = {
  uploadProduct: uploadProduct,
  getDashboardProducts: getDashboardProducts,
};
