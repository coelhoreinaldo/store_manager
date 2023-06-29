const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusToHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productsService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const product = req.body;
  const { status, data } = await productsService.insert(product);
  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const { status, data } = await productsService.update(id, product);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProduct(id);
  return res.status(mapStatusHTTP(status)).json(data) || res.sendStatus(status).end();
};

module.exports = {
  findAll, findById, insert, update, deleteProduct,
};