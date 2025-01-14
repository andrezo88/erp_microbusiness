import Joi from "joi";
import { OrderStatus } from "../model/order/order.interface.ts";

export const schemaCreateOrder = Joi.object({
 company: Joi.string().required(),
 user: Joi.string().required(),
 products: Joi.array().items(
  Joi.object({
   product: Joi.string().required(),
   quantity: Joi.number().required(),
  })
 ).required(),
 total: Joi.number().required(),
 status: Joi.string().valid(...Object.values(OrderStatus)).required(),
})