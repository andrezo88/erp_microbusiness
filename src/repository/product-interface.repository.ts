import {
  IProductRequest,
  IProductRequestUpdatePriceAndStock,
  IProductRequestUpdateStock,
  IProductResponse,
} from "../model/product/product.interface.ts";

export abstract class IProductRepository {
  abstract create(product: IProductRequest): Promise<void>;
  abstract find(): Promise<IProductResponse[]>;
  abstract findById(id: string): Promise<IProductResponse>;
  abstract findByIdAndUpdate(
    id: string,
    product: IProductRequest
  ): Promise<void>;
  abstract findByIdAndUpdatePriceAndStock(
    id: string,
    product: IProductRequestUpdatePriceAndStock
  ): Promise<void>;
  abstract findByIdAndUpdateStock(
    id: string,
    product: IProductRequestUpdateStock
  ): Promise<void>;
  abstract updateCompany(id: string, company: string): Promise<void>;
  abstract updateActiveProduct(id: string): Promise<void>;
  abstract updateDesactiveProduct(id: string): Promise<void>;
}
