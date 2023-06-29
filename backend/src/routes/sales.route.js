const route = require('express').Router();

const { salesController } = require('../controllers');
const validateSale = require('../middlewares/validateSale');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);

route.post('/', validateSale, salesController.insert);

route.delete('/:id', salesController.deleteSale);

module.exports = route;
