import {
  Categories,
  IProductRequest,
  IProductRequestUpdatePriceAndStock,
  IProductRequestUpdateStock,
  IProductResponse,
} from "../../model/product/product.interface.ts";
import { product } from "../../model/product/product.model.ts";
import { IProductRepository } from "../product-interface.repository.ts";

export class ProductRepository implements IProductRepository {
  async create(productEntity: IProductRequest): Promise<void> {
    await product.create({
      name: productEntity.name,
      description: productEntity.description,
      category: productEntity.category,
      price: productEntity.price,
      stock: productEntity.stock,
      company: productEntity.company,
    });
  }

  async find(): Promise<IProductResponse[]> {
    const products = (await product.find({
      isActive: true,
    })) as IProductResponse[];
    return products.map((p: any) => ({
      _id: p._id,
      name: p.name,
      description: p.description,
      category: p.category,
      price: p.price,
      stock: p.stock,
      company: p.company,
    }));
  }

  async findById(id: string): Promise<IProductResponse> {
    const productFound = (await product.findOne({
      _id: id,
      isActive: true,
    })) as IProductResponse;

    if (!productFound) {
      throw new Error("Produto nao encontrado");
    }

    return productFound;
  }

  async findByIdAndUpdate(
    id: string,
    productEntity: IProductRequest
  ): Promise<void> {
    await product.findByIdAndUpdate(id, {
      name: productEntity.name,
      description: productEntity.description,
      category: productEntity.category,
      price: productEntity.price,
      stock: productEntity.stock,
      company: productEntity.company,
    });
  }

  async findByIdAndUpdatePriceAndStock(
    id: string,
    productEntity: IProductRequestUpdatePriceAndStock
  ): Promise<void> {
    await product.findByIdAndUpdate(id, {
      price: productEntity.price,
      stock: productEntity.stock,
    });
  }

  async findByIdAndUpdateStock(
    id: string,
    productEntity: IProductRequestUpdateStock
  ): Promise<void> {
    await product.findByIdAndUpdate(id, {
      stock: productEntity.stock,
    });
  }

  async updateCompany(id: string, company: string): Promise<void> {
    await product.updateOne({ _id: id }, { $push: { company } });
  }

  async updateActiveProduct(id: string): Promise<void> {
    await product.updateOne({ _id: id }, { $set: { isActive: true } });
  }

  async updateDesactiveProduct(id: string): Promise<void> {
    await product.updateOne({ _id: id }, { $set: { isActive: false } });
  }
}
