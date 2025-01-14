import { Router } from "express";
import { StockController } from "../controller/stock.controller.ts";

const stockRoutes = Router();

const stockController = new StockController();

stockRoutes.put('/:id', stockController.createStock);


export { stockRoutes }