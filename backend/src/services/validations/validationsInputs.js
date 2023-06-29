const { addNewProduct, addNewSale, updateQuantity } = require('./schemas');

const validateNewProduct = (newProduct) => {
  const { error } = addNewProduct.validate(newProduct);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateNewSale = (newSale) => {
  const { error } = addNewSale.validate(newSale);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateQuantity = (newSale) => {
  const { error } = updateQuantity.validate(newSale);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNewProduct, validateNewSale, validateQuantity,
};