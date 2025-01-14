import Joi from "joi";
import { IProductRequest, IProductRequestUpdate } from "../model/product/product.interface.ts";
import { company } from "../model/company/company.model.ts";

export const schemaProduct = Joi.object<
 IProductRequest,
 true
>({
 name: Joi.string().min(3).required(),
 price: Joi.number().required(),
 description: Joi.string().min(3).required(),
})

export const schemaProductUpdate = Joi.object<
 IProductRequestUpdate,
 true
>({
 name: Joi.string().min(3),
 description: Joi.string().min(3),
 price: Joi.number(),
 stock: Joi.number(),
 company: Joi.string().min(11).max(11)
})