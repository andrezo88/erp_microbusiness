import { Router } from "express"
import { OrderController } from "../controller/order.controller.ts"


const orderRoutes = Router()

const orderController = new OrderController()

orderRoutes.get('/', orderController.getAllOrders)
orderRoutes.post('/', orderController.createOrder)
orderRoutes.post('/:id', orderController.updateOrder)

export { orderRoutes }