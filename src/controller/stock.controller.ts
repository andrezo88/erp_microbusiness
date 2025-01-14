import { NextFunction, Response } from "express"
import { CustomRequest } from "../model/custom-request/express.model.ts"
import { IStockRequest } from "../model/stock/stock.interface.ts"
import { errorHandler } from "../utils/error-handler.ts"
import { schemaCreateStock } from "../schema/stock.schema.ts"
import { HttpException } from "../utils/Http-exception.ts"
import httpStatus from "http-status"
import { StockService } from "../service/stock.service.ts"

const stockService = new StockService()

export class StockController {
 public async createStock(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const stockData: IStockRequest = req.body
   const { id } = req.params
   const userId = req.user?._id as string
   const userRole = req.user?.role as number
   const { value, error } = schemaCreateStock.validate(stockData);

   if (error) {
    throw new HttpException(
     httpStatus.UNPROCESSABLE_ENTITY,
     error.details[0].message
    )
   }

   await stockService.createStock(id, userId, userRole, value)
   res.status(httpStatus.OK).send()
  } catch (error) {
   next(errorHandler("createStock", error))
  }
 }
}