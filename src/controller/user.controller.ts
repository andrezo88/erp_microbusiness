import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { errorHandler } from "../utils/error-handler.ts";
import { UserService } from "../service/user.service.ts";
import {
  IUserRequest,
  IUserRequestUpdate,
  IUserResponse,
} from "../model/user/user.interface.ts";
import { schemaUser, schemaUserUpdate } from "../schema/user.schema.ts";
import { HttpException } from "../utils/Http-exception.ts";
import { CustomRequest } from "../model/custom-request/express.model.ts";

export class UserController {
  constructor(private userService: UserService) {}

  public getAllUsers = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(httpStatus.OK).json(users);
    } catch (error) {
      return next(errorHandler("getAllUsers", error));
    }
  };

  public createUser = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: IUserRequest = req.body;

      const { value, error } = schemaUser.validate(user);

      if (error) {
        throw new HttpException(
          httpStatus.UNPROCESSABLE_ENTITY,
          error.details[0].message
        );
      }

      const createdUser = await this.userService.createUser(value);
      res.status(httpStatus.CREATED).json(createdUser);
    } catch (error) {
      return next(errorHandler("createUser", error));
    }
  };

  public getUserById = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.status(httpStatus.OK).json(user);
    } catch (error) {
      return next(errorHandler("getUserById", error));
    }
  };

  public updateUser = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user: IUserRequestUpdate = req.body;
      const userRole: number = req.user?.role ?? 1050;
      // melhorar a verificacao de role
      if (userRole !== 3050) {
        throw new HttpException(httpStatus.FORBIDDEN, "Usuário não autorizado");
      }

      const { value, error } = schemaUserUpdate.validate(user);

      if (error) {
        throw new HttpException(
          httpStatus.UNPROCESSABLE_ENTITY,
          error.details[0].message
        );
      }

      const updatedUser = await this.userService.updateUser(id, value);
      res.status(httpStatus.OK).json(updatedUser);
    } catch (error) {
      return next(errorHandler("updateUser", error));
    }
  };
}
