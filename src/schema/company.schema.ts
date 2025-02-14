import Joi from "joi";
import { ICompanyRequest } from "../model/company/company.interface.ts";

export const schemaCreateCompany = Joi.object<ICompanyRequest, true>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),
  document: Joi.string().min(11).max(14).required(),
  user: Joi.string().required(),
});
