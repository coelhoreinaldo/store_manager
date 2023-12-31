const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusToHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await salesService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const sales = req.body;
  const { status, data } = await salesService.insert(sales);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteSale(id);
  return res.status(mapStatusHTTP(status)).json(data) || res.status(status).end();
};

const updateQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const quantity = req.body;
  const { status, data } = await salesService.updateQuantity(+saleId, +productId, quantity);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll, findById, insert, deleteSale, updateQuantity,
};