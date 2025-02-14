import { IStockRequest } from "../model/stock/stock.interface.ts";
import { IProductResponse } from "../model/product/product.interface.ts";
import { IStockRepository } from "../repository/stock-interface.repository.ts";
import { StockRepository } from "../repository/stock/stock.repository.ts";
import { IProductRepository } from "../repository/product-interface.repository.ts";
import { ProductRepository } from "../repository/product/product.repository.ts";

export class StockService {
  constructor(
    private stockRepository: IStockRepository = new StockRepository(),
    private productRepository: IProductRepository = new ProductRepository()
  ) { }
    
    // verificar como implementar a validação nf fiscal válida, se válida inserir o estoque
  async createStock(
    productId: string,
    userId: string,
    userRole: number,
    stockEntity: IStockRequest
  ): Promise<void> {
    if (userRole !== 3050) {
      throw new Error("Usuário não autorizado");
    }

    const { price, quantity } = stockEntity;

    const productFound: IProductResponse =
      (await this.productRepository.findById(productId)) as IProductResponse;

    if (!productFound) {
      throw new Error("Produto não encontrado");
    }

    productFound.stock = productFound.stock + quantity;

    await this.productRepository.findByIdAndUpdatePriceAndStock(productId, {
      price: price,
      stock: productFound.stock,
    });

    await this.stockRepository.createStock({
      nf: stockEntity.nf,
      company: stockEntity.company,
      price: stockEntity.price,
      product: productId,
      quantity: stockEntity.quantity,
      user: userId,
    });
  }
}
