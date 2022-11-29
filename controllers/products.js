const Product = require("../models/product");

// '/'
const getAllProducts = async (req, res) => {
  const { name, featured, company } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = name; //parâmetro name recebe variável name
  }
  if (featured) {
    queryObject.featured = featured === "1" ? 1 : 0;
  }
  if (company) {
    queryObject.company = company;
  }
  console.log(queryObject);
  const productsFilter = await Product.find(queryObject);
  res.status(200).json({ total: productsFilter.length, productsFilter });
};

// '/static'
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ Total: products.length, products });
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
