import { NextFunction } from "express";
import { IUserLogin } from "../model/user/user.interface.ts";
import { schemaLogin } from "../schema/user.schema.ts";
import { errorHandler } from "../utils/error-handler.ts";
import { HttpException } from "../utils/Http-exception.ts";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { LoginService } from "../service/login.service.ts";

const loginService = new LoginService();

export class LoginController {
 async login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
   const userLogin: IUserLogin = req.body;


   const { value, error } = schemaLogin.validate(userLogin);

   if (error) {
    throw new HttpException(
     httpStatus.BAD_REQUEST,
     error.details[0].message
    );
   }

   const createdUser = await loginService.login(value);
   res.status(httpStatus.OK).json(createdUser);
  } catch (error) {
   return next(errorHandler('loginUser', error));
  }
 }
}