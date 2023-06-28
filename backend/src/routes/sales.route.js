const route = require('express').Router();
// const { salesController } = require('../controllers');

route.get('/', (req, res) => res.status(200).end());
route.get('/:id', (req, res) => res.status(200).end());

// route.get('/', (req, res) => res.status(200).end());
// route.get('/:id', salesController.findById);

module.exports = route;
