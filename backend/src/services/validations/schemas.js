const Joi = require('joi');

const addNewProduct = Joi.object({
  name: Joi.string().min(5),
});

module.exports = { addNewProduct };