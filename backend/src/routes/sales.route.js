const route = require('express').Router();

const { salesController } = require('../controllers');
const validateQuantity = require('../middlewares/validateQuantity');
const validateSale = require('../middlewares/validateSale');

route.put(
  '/:saleId/products/:productId/quantity',
  validateQuantity,
  salesController.updateQuantity,
);
route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);

route.post('/', validateSale, salesController.insert);

route.delete('/:id', salesController.deleteSale);

module.exports = route;
