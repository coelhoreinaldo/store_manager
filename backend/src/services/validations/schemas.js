const Joi = require('joi');

const addNewProduct = Joi.object({
  name: Joi.string().min(5),
});

const addNewSale = Joi.array().items(Joi.object({
  productId: Joi.number().integer().required().messages({
    'any.required': '"productId" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
}));

module.exports = { addNewProduct, addNewSale };