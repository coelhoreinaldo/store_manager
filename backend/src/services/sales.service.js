const { salesModel, productsModel } = require('../models');
const { validateNewSale, validateQuantity } = require('./validations/validationsInputs');

const findAll = async () => {
  const sales = await salesModel.findAll();
  if (!sales) {
    return { status: 'NOT FOUND', data: { message: 'There are no sales' } };
  }
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const insert = async (sales) => {
  const error = validateNewSale(sales);
  if (error) return { status: error.status, data: { message: error.message } };

  const products = sales.map((product) => productsModel.findById(product.productId));
  const result = await Promise.all(products);
  if (result.some((e) => e === undefined)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const id = await salesModel.insert(sales);
  const formattedSales = {
    id,
    itemsSold: sales,
  };
  return { status: 'CREATED', data: formattedSales };
};

const deleteSale = async (saleId) => {
  const saleExists = await salesModel.findById(saleId);
  if (saleExists.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  await salesModel.deleteSale(saleId);

  return { status: 'DELETED' };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const error = validateQuantity(quantity);
  if (error) return { status: error.status, data: { message: error.message } };

  const saleExists = await salesModel.findById(saleId);
  if (saleExists.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  const productExists = saleExists.find((e) => e.productId === productId);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }

  const updatedSale = await salesModel.updateQuantity(saleId, productId, quantity);

  return { status: 'SUCCESSFUL', data: updatedSale };
};

module.exports = { findAll, findById, insert, deleteSale, updateQuantity };