import Joi from "joi";
import { Categories } from "../model/product/product.interface.ts";
import { company } from "../model/company/company.model.ts";

export const schemaCreateProduct = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid(...Object.values(Categories))
    .required(),
});

export const schemaUpdateProduct = Joi.object({
  name: Joi.string().min(3),
  description: Joi.string().min(3),
  price: Joi.number(),
  category: Joi.string().valid(...Object.values(Categories)),
  stock: Joi.number(),
  company: Joi.string(),
});
