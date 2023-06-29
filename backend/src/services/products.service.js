const { productsModel } = require('../models');
const { validateNewProduct } = require('./validations/validationsInputs');

const findAll = async () => {
  const products = await productsModel.findAll();
  if (!products) {
    return { status: 'NOT FOUND', data: { message: 'There are no products' } };
  }
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

const insert = async (product) => {
  const error = validateNewProduct(product);
  if (error) return { status: error.status, data: { message: error.message } };
  const insertId = await productsModel.insert(product);
  const newProduct = await productsModel.findById(insertId);

  return { status: 'CREATED', data: newProduct };
};

const update = async (productId, product) => {
  const productExists = await productsModel.findById(productId);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const error = validateNewProduct(product);
  if (error) return { status: error.status, data: { message: error.message } };

  await productsModel.update(productId, product);
  const updatedProduct = await productsModel.findById(productId);

  return { status: 'SUCCESSFUL', data: updatedProduct };
};

const deleteProduct = async (productId) => {
  const productExists = await productsModel.findById(productId);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await productsModel.deleteProduct(productId);

  return { status: 'DELETED' };
};

module.exports = { findAll, findById, insert, update, deleteProduct };