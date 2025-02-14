import { IStockRequest } from "../../model/stock/stock.interface.ts"
import { stock } from "../../model/stock/stock.model.ts"
import { IStockRepository } from "../stock-interface.repository.ts"

export class StockRepository implements IStockRepository {

    async createStock(stockEntity: IStockRequest): Promise<void> {

        await stock.create({
            nf: stockEntity.nf,
            company: stockEntity.company,
            price: stockEntity.price,
            quantity: stockEntity.quantity,
            product: stockEntity.product,
            user: stockEntity.user
        })
    }
    
}