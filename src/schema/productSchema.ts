import Joi from "joi";
import { Categories } from "../model/product/product.interface.ts";

export const schemaCreateProduct = Joi.object({
 name: Joi.string().min(3).required(),
 description: Joi.string().min(3).required(),
 price: Joi.number().required(),
 category: Joi.string().valid(...Object.values(Categories)).required(),
})
