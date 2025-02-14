import { IOrderResponse, IOrderRequest, IOrderStatusUpdate } from "../model/order/order.interface.ts";

export abstract class IOrderRepository {
    abstract find(): Promise<IOrderResponse[]>
    abstract createOrder(order: IOrderRequest): Promise<void>
    abstract findById(id: string): Promise<IOrderResponse>
    abstract findByIdAndUpdate(id: string, order: IOrderStatusUpdate): Promise<void>
}