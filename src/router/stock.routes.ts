import { Router } from "express";
import { StockController } from "../controller/stock.controller.ts";
import { auth } from "../middleware/auth.middleware.ts";
import { stockFactory } from "./factory/stock.factory.ts";

export async  function stockRoute(app: Router) {

    const router = Router()

    router.put("/:id", auth, async (req, res, next) => {
        await stockFactory.createStock(req, res, next)
    })
    return router
}