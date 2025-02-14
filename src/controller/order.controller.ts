import { Response, NextFunction } from "express";
import { CustomRequest } from "../model/custom-request/express.model.ts";
import { errorHandler } from "../utils/error-handler.ts";
import httpStatus from "http-status";
import { HttpException } from "../utils/Http-exception.ts";
import { IOrderResponse } from "../model/order/order.interface.ts";
import { schemaCreateOrder } from "../schema/order.schema.ts";
import { OrderService } from "../service/order.service.ts";

export class OrderController {
    constructor (
        private orderService: OrderService = new OrderService()
    ) { }
  async getAllOrders(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const orders = await this.orderService.getAllOrders();
      res.status(httpStatus.OK).json(orders);
    } catch (error) {
      next(errorHandler("getAllOrders", error));
    }
  }

  async createOrder(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      const order: IOrderResponse = req.body;
      const { value, error } = schemaCreateOrder.validate(order);

      if (error) {
        throw new HttpException(
          httpStatus.UNPROCESSABLE_ENTITY,
          error.details[0].message
        );
      }

      await this.orderService.createOrder(value);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(errorHandler("createOrder", error));
    }
  }

  async updateOrder(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.orderService.updateStatusOrder(id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(errorHandler("updateOrder", error));
    }
  }

  async cancelOrder(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.orderService.cancelOrder(id);
      res.status(httpStatus.OK).send();
    } catch (error) {
      next(errorHandler("cancelOrder", error));
    }
  }
}
