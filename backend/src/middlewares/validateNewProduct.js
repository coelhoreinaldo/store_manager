const checkRequiredFields = require('../utils/checkRequiredFields');

const validateCreateProduct = (req, res, next) => {
  const product = req.body;
  const requiredFields = ['name'];

  const error = checkRequiredFields(product, requiredFields);
  if (error) return res.status(400).json({ message: error });
  return next();
};

module.exports = validateCreateProduct;