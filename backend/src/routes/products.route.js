const route = require('express').Router();
const { productsController } = require('../controllers');
// const connection = require('../models/connection');

// route.get('/', async (req, res) => {
//   const [products] = await connection.execute('SELECT * FROM products ORDER BY id');
//   return res.status(200).json(products);
// });

// route.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
//   return res.status(200).json(product);
// });

route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);

module.exports = route;
