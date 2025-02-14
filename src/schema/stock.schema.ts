import Joi from "joi";
import { IStockRequest } from "../model/stock/stock.interface.ts";

export const schemaCreateStock = Joi.object<IStockRequest, true>({
  nf: Joi.string().required(),
  company: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  user: Joi.string().required(),
  product: Joi.string().required(),
});
