import { Router } from "express"
import { auth } from "../middleware/auth.middleware.ts"
import { orderFactory } from "./factory/order.factory.ts"

export async function orderRoute(app: Router) {
    
    const router = Router()

    router.get("/", auth, async (req, res, next) => {
        await orderFactory.getAllOrders(req, res, next)
    })
    router.post("/", auth, async (req, res, next) => {
        await orderFactory.createOrder(req, res, next)
    })
    router.post("/:id", auth, async (req, res, next) => {
        await orderFactory.updateOrder(req, res, next)
    })
    router.post("/:id/cancel", auth, async (req, res, next) => {
        await orderFactory.cancelOrder(req, res, next)
    })
    return router
}