const route = require('express').Router();

const { salesController } = require('../controllers');
const validateNewSale = require('../middlewares/validateNewSale');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);

route.post('/', validateNewSale, salesController.insert);

module.exports = route;
