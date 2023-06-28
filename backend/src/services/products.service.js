const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  if (!products || products.length === 0) {
    return { status: 'NOT FOUND', data: 'There are no products' };
  }
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) {
    return { status: 'NOT_FOUND', data: 'Product not found' };
  }
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = { findAll, findById };