const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  console.log(sales);
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

module.exports = { findAll, findById };