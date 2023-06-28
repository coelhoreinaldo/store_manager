const route = require('express').Router();
const { productsController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);

route.post('/', validateNewProduct, productsController.insert);

module.exports = route;
