const checkRequiredFields = require('../utils/checkRequiredFields');

const validateCreateSale = (req, res, next) => {
  const sales = req.body;
  const requiredFields = ['productId', 'quantity'];

  let error = '';

  for (let i = 0; i < sales.length; i += 1) {
    const fail = checkRequiredFields(sales[i], requiredFields);
    if (fail) {
      error = fail;
      break;
    }
  }

  if (error) return res.status(400).json({ message: error });
  return next();
};

module.exports = validateCreateSale;