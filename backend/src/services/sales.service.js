const { salesModel, productsModel } = require('../models');
const { validateNewSale } = require('./validations/validationsInputs');

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
  const products = sales.map((product) => productsModel.findById(product.productId));
  const result = await Promise.all(products);
  console.log(result);
  if (result.some((e) => e === undefined)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const error = validateNewSale(sales);
  if (error) return { status: error.status, data: { message: error.message } };
  const id = await salesModel.insert(sales);
  const formattedSales = {
    id,
    itemsSold: sales,
  };
  return { status: 'CREATED', data: formattedSales };
};

module.exports = { findAll, findById, insert };