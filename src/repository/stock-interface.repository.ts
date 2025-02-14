import { IStockRequest } from "../model/stock/stock.interface.ts";

export abstract class IStockRepository {
    abstract createStock(stockEntity: IStockRequest): Promise<void>
}