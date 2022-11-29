const Product = require("../models/product");

// '/'
const getAllProducts = async (req, res) => {
  const { name, featured, company, sort, fields, numericFilters } = req.query;
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

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ total: products.length, products });
};

// '/static'
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select("name price");
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
