const Brand = require("../models/brand");

const getAll = async (req, res) => {
  res.json("getAll");
};

const create = async (req, res) => {
  const brandInfo = req.body;
  const currentDate = new Date();
  const newBrand = new Brand({
    name: brandInfo.name,
    description: brandInfo.description,
    price: brandInfo.price,
    categoryID: brandInfo.categoryID,
    createdAt: currentDate,
    modifiedAt: currentDate,
  });

  newBrand
    .save()
    .then((savedBrand) => {
      console.log("Brand saved:", savedBrand);
      res.status(201).json({ message: "Brand created successfully" });
    })
    .catch((err) => {
      console.log("Error while creating Brand:", err);
      res.status(500).json({ message: "Internal Server Error", error: err });
    });
};

module.exports = {
  getAll,
  create,
};
