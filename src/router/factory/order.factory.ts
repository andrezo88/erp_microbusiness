import { OrderController } from "../../controller/order.controller.ts"
import { OrderRepository } from "../../repository/order/order.repository.ts"
import { OrderService } from "../../service/order.service.ts"


const OrderFactory = () => {
    
    const orderRepository = new OrderRepository()
    const orderService = new OrderService(orderRepository)
    const orderController = new OrderController(orderService)
    return orderController
}

export const orderFactory = OrderFactory()