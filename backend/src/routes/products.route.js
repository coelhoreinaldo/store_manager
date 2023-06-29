const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProduct = require('../middlewares/validateProduct');

route.get('/search', productsController.findByName);
route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);

route.post('/', validateProduct, productsController.insert);

route.put('/:id', validateProduct, productsController.update);

route.delete('/:id', productsController.deleteProduct);

module.exports = route;
