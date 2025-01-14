import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";
import { HttpException } from "../utils/Http-exception.ts";

export function errorMiddleware(
 error: HttpException,
 _req: Request,
 res: Response,
 next: NextFunction
) {
 const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
 const message = error.message || HttpStatus["500_MESSAGE"];
 res.status(status).send({
  status,
  message,
  details: error.detail || undefined,
 });
}

export function notFoundMiddleware(_req: Request, res: Response) {
 const status = HttpStatus.NOT_FOUND;
 const message = HttpStatus["404_MESSAGE"];

 res.status(status).send({ message });
}