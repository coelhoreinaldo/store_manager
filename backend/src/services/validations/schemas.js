const Joi = require('joi');

const quantitySchema = Joi.number().min(1).messages({
  'any.required': '"quantity" is required',
  'number.min': '"quantity" must be greater than or equal to 1',
});

const addNewProduct = Joi.object({
  name: Joi.string().min(5),
});

const updateQuantity = Joi.object({
  quantity: quantitySchema,
});

const addNewSale = Joi.array().items(Joi.object({
  productId: Joi.number().integer().required().messages({
    'any.required': '"productId" is required',
  }),
  quantity: quantitySchema,
}));

module.exports = { addNewProduct, addNewSale, quantitySchema, updateQuantity };