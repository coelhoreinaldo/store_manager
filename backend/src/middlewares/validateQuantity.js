const checkRequiredFields = require('../utils/checkRequiredFields');

const validateQuantity = (req, res, next) => {
  const quantity = req.body;
  const requiredFields = ['quantity'];

  const error = checkRequiredFields(quantity, requiredFields);
  if (error) return res.status(400).json({ message: error });
  return next();
};

module.exports = validateQuantity;