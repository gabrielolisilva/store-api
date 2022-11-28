const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "products testing rote" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

const createProduct = async (req, res) => {
  try {
    const task = await Product.create(req.body);
    res.status = 201;
    res.json({ task, created: true });
  } catch (error) {
    res.status(500);
    res.json({ msg: error });
  }
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  createProduct,
};
