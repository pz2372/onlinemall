const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const { S3DeleteImg, S3UploadImg } = require("../utils/s3");
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    let where = {};
    if (category && category !== "undefined") {
      where.category = category;
    }
    const products = await Product.find(where)
      .populate("sizes")
      .populate("colors")
      .populate({
        path: "brand",
        populate: {
          path: "categories",
        },
      })
      .populate("category")
      .populate("reviews.user")
      .populate("ratings.user")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ modifiedAt: -1 })
      .exec();

    const count = await Product.count();

    res.status(200).send({
      success: true,
      data: products,
      currentPage: Number(page),
      totalPages: Math.ceil(count / limit),
      totalCount: Number(count),
    });
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const getProductsByCategoryWithBrands = async (req, res) => {
  try {
    const {
      page = 1,
      limit,
      sort,
      categoryIds,
      colorIds,
      sizeIds,
      minRangeVal,
      maxRangeVal,
    } = req.body;
    const where = {
      price: { $lte: maxRangeVal || 100, $gte: minRangeVal || 0 },
    };
    if (categoryIds && categoryIds.length) {
      where.category = { $in: categoryIds };
    }
    if (colorIds && colorIds.length) {
      where.colors = { $in: colorIds };
    }
    if (sizeIds && sizeIds.length) {
      where.sizes = { $in: sizeIds };
    }

    const products = await Product.find(where)
      .populate("sizes")
      .populate("colors")
      .populate({
        path: "brand",
        populate: {
          path: "categories",
        },
      })
      .populate("category")
      .populate("reviews.user")
      .populate("ratings.user")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const obj = {};
    Promise.all([
      products.map((p) => {
        if (obj[p.brand.name]) {
          obj[p.brand.name].push(p);
        } else {
          obj[p.brand.name] = [p];
        }
        return obj;
      }),
    ]);
    res.status(200).send({
      success: true,
      data: obj,
    });
    // const c = await Category.findById(categoryId);
    // if (c.path === "MEN" || c.path === "WOMEN") {
    //   const categories = await Category.find({
    //     path: { $regex: "^" + c.path },
    //   });
    //   const products = [];
    //   const doc = categories.map(async (cat) => {
    //     const query = await Product.find({ category: cat._id })
    //       .populate("sizes")
    //       .populate("colors")
    //       .populate({
    //         path: "brand",
    //         populate: {
    //           path: "categories",
    //         },
    //       })
    //       .populate("category")
    //       .exec();
    //     if (query.length) {
    //       query.map((q) => {
    //         products.push(q);
    //       });
    //     }
    //     return products;
    //   });
    //   const results = await Promise.all(doc);
    //   res.status(200).send({
    //     success: true,
    //     data: results[0],
    //   });
    // } else {
    //   const products = await Product.find({ category: categoryId })
    //     .populate("sizes")
    //     .populate("colors")
    //     .populate({
    //       path: "brand",
    //       populate: {
    //         path: "categories",
    //       },
    //     })
    //     .populate("category")
    //     .exec();
    //   res.status(200).send({
    //     success: true,
    //     data: products,
    //   });
    // }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const getById = async (req, res) => {
  try {
    const _id = req.params?.id;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const product = await Product.findOne({ _id })
        .populate("sizes")
        .populate("colors")
        .populate({
          path: "brand",
          populate: {
            path: "categories",
          },
        })
        .populate("category")
        .populate("reviews.user")
        .populate("ratings.user");
      if (!product) {
        res.status(404).send({ message: "Product not found.", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: product,
        });
      }
    } else {
      res.status(500).send({ message: "Invalid id provided.", success: false });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const getByIds = async (req, res) => {
  try {
    const productIds = req.body;
    const products = await Product.find({ _id: { $in: productIds } })
      .populate("sizes")
      .populate("colors")
      .populate({
        path: "brand",
        populate: {
          path: "categories",
        },
      })
      .populate("category")
      .populate("reviews.user")
      .populate("ratings.user");
    if (!products.length) {
      res.status(404).send({ message: "No products found.", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: products,
      });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const getProductsByBrand = async (req, res) => {
  try {
    const {
      page = 1,
      limit,
      brandId,
      categoryIds,
      colorIds,
      sizeIds,
      minRangeVal,
      maxRangeVal,
    } = req.body;
    const where = {
      brand: brandId,
      price: { $lte: maxRangeVal || 100, $gte: minRangeVal || 0 },
    };
    if (colorIds && colorIds.length) {
      where.colors = { $in: colorIds };
    }
    if (categoryIds && categoryIds.length) {
      where.category = { $in: categoryIds };
    }
    if (sizeIds && sizeIds.length) {
      where.sizes = { $in: sizeIds };
    }
    const products = await Product.find(where)
      .populate("sizes")
      .populate("colors")
      .populate({
        path: "brand",
        populate: {
          path: "categories",
        },
      })
      .populate("category")
      .populate("reviews.user")
      .populate("ratings.user")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (!products.length) {
      res.status(404).send({ message: "No products found.", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: products,
      });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const addReview = async (req, res) => {
  try {
    const body = req.body;
    const newReview = {
      user: body.user,
      text: body.reviewText,
      createdAt: new Date(),
    };
    const newRating = {
      user: body.user,
      rate: body.ratingValue,
    };
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: body.productId },
      { $push: { reviews: newReview, ratings: newRating } },
      {
        new: true,
      }
    );

    const product = await Product.findOne({ _id: updatedProduct._id })
      .populate("sizes")
      .populate("colors")
      .populate({
        path: "brand",
        populate: {
          path: "categories",
        },
      })
      .populate("category")
      .populate("reviews.user")
      .populate("ratings.user");

    res.status(200).send({
      message: "Your review has been added!",
      success: true,
      data: product,
    });
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const create = async (req, res) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length) {
      res
        .status(500)
        .send({ message: "Validation failed.", error: errors, success: false });
    } else {
      const body = req.body;
      const images = req.files;
      let imageURLs = [];
      if (images.length) {
        images.forEach(async (image) => {
          let path = `products/${Date.now()}-${image.originalname}`;
          imageURLs.push(path);
          await S3UploadImg(path, image.buffer);
        });
      }
      const newProduct = new Product({
        name: body.name,
        description: body.description,
        SKU: body.SKU,
        price: body.price,
        sizes: body.sizes,
        colors: body.colors,
        images: imageURLs,
        brand: body.brand,
        category: body.category,
        createdAt: new Date(),
        modifiedAt: new Date(),
        deletedAt: new Date(),
      });

      await newProduct.save();

      const products = await Product.find()
        .populate("sizes")
        .populate("colors")
        .populate({
          path: "brand",
          populate: {
            path: "categories",
          },
        })
        .populate("category")
        .populate("reviews.user")
        .populate("ratings.user")
        .skip(0)
        .limit(10)
        .sort({ modifiedAt: -1 })
        .exec();

      const count = await Product.count();

      res.status(201).send({
        message: "Product created!",
        success: true,
        data: products,
        currentPage: 1,
        totalPages: Math.ceil(count / 10),
        totalCount: Number(count),
      });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const update = async (req, res) => {
  try {
    const _id = req.params?.id;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const where = { _id };
      let update = req.body;
      const product = await Product.findOne(where);
      if (!product) {
        res.status(404).send({ message: "Product not found", success: false });
      } else {
        const images = req.files;
        update.images =
          typeof update.images === "string"
            ? [update.images]
            : !update.images
            ? []
            : update.images;
        if (images.length) {
          const deletedImages = product.images.filter(
            (image) => !update.images.includes(image)
          );
          if (deletedImages.length) {
            deletedImages.forEach(async (image) => {
              await S3DeleteImg(image);
            });
          }
          let imageURLs = update.images;
          images.forEach(async (image) => {
            let path = `products/${Date.now()}-${image.originalname}`;
            imageURLs.push(path);
            await S3UploadImg(path, image.buffer);
          });
          update.images = imageURLs;
        } else {
          const deletedImages = product.images.filter(
            (image) => !update.images.includes(image)
          );
          if (deletedImages.length) {
            deletedImages.forEach(async (image) => {
              await S3DeleteImg(image);
            });
          }
        }
        update.modifiedAt = new Date();
        const updateProduct = await Product.findOneAndUpdate(where, update, {
          new: true,
        });

        const updatedProduct = await Product.findOne({ _id: updateProduct._id })
          .populate("sizes")
          .populate("colors")
          .populate({
            path: "brand",
            populate: {
              path: "categories",
            },
          })
          .populate("category")
          .populate("reviews.user")
          .populate("ratings.user");

        res.status(200).send({
          message: "Product updated!",
          success: true,
          data: updatedProduct,
        });
      }
    } else {
      res.status(500).send({ message: "Invalid id provided.", success: false });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

const deleteById = async (req, res) => {
  try {
    const _id = req.params?.id;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const product = await Product.findOne({ _id });
      if (!product) {
        res.status(404).send({ message: "Product not found", success: false });
      } else {
        if (product.images.length) {
          product.images.forEach(async (image) => {
            await S3DeleteImg(image);
          });
        }
        await Product.deleteOne({ _id: product._id });

        const products = await Product.find()
          .populate("sizes")
          .populate("colors")
          .populate({
            path: "brand",
            populate: {
              path: "categories",
            },
          })
          .populate("category")
          .populate("reviews.user")
          .populate("ratings.user")
          .skip(0)
          .limit(10)
          .sort({ modifiedAt: -1 })
          .exec();

        const count = await Product.count();

        res.status(200).send({
          message: "Product deleted!",
          success: true,
          data: products,
          currentPage: 1,
          totalPages: Math.ceil(count / 10),
          totalCount: Number(count),
        });
      }
    } else {
      res.status(500).send({ message: "Invalid id provided.", success: false });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

module.exports = {
  getAll,
  getProductsByCategoryWithBrands,
  getById,
  getByIds,
  getProductsByBrand,
  create,
  update,
  deleteById,
  addReview,
};
