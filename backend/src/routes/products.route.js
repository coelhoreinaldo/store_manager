const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProduct');

route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);

route.post('/', validateProduct, productsController.insert);

// route.put('/products/:id', productsController.update);

module.exports = route;
