import Joi from "joi";
import { IUserRequest, IUserRequestUpdate } from "../model/user/user.interface.ts";


export const schemaUser = Joi.object<
 IUserRequest,
 true
>({
 name: Joi.string().min(3).required(),
 email: Joi.string().email().required(),
 password: Joi.string().min(6).max(15).required()
})

export const schemaLogin = Joi.object({
 email: Joi.string().email().required(),
 password: Joi.string().min(6).max(15).required()
})

export const schemaUserUpdate = Joi.object<
 IUserRequestUpdate,
 true
>({
 name: Joi.string().min(3),
 email: Joi.string().email(),
 password: Joi.string().min(6).max(15),
 role: Joi.number().valid(1050, 3050)
})