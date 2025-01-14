import { IStockRequest } from "../model/stock/stock.interface.ts";
import { product as productModel } from "../model/product/product.model.ts";
import { IProductResponse } from "../model/product/product.interface.ts";
import { stock } from "../model/stock/stock.model.ts";

export class StockService {

 public async createStock(productId: string, userId: string, userRole: number, stockEntity: IStockRequest): Promise<void> {

  if (userRole !== 3050) {
   throw new Error('Usuário não autorizado')
  }

  const { price, quantity } = stockEntity

  const productFound: IProductResponse = await productModel.findById(productId) as IProductResponse

  if (!productFound) {
   throw new Error('Produto não encontrado')
  }

  productFound.stock = productFound.stock + quantity

  await productModel.updateOne(
   { _id: productId },
   {
    price: price,
    stock: productFound.stock
   }
  )

  await stock.create({
   nf: stockEntity.nf,
   company: stockEntity.company,
   price: stockEntity.price,
   product: productId,
   quantity: stockEntity.quantity,
   user: userId
  });
 }

}