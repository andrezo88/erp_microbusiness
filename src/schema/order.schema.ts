import Joi from "joi";

export const schemaCreateOrder = Joi.object({
 company: Joi.string().required(),
 user: Joi.string().required(),
 products: Joi.array().items(
  Joi.object({
   product: Joi.string().required(),
   quantity: Joi.number().required(),
  })
 ).required()
})