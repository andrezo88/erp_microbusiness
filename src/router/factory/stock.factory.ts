import { StockController } from "../../controller/stock.controller.ts"
import { StockRepository } from "../../repository/stock/stock.repository.ts"
import { StockService } from "../../service/stock.service.ts"

const StockFactory = () => {

    const stockRepository = new StockRepository()
    const stockService = new StockService(stockRepository)
    const stockController = new StockController(stockService)
    return stockController
}

export const stockFactory = StockFactory()