import {
  IProductRequest,
  IProductRequestUpdate,
  IProductResponse,
} from "../model/product/product.interface.ts";
import { ICompanyRepository } from "../repository/company-interface.repository.ts";
import { CompanyRepository } from "../repository/company/company.repository.ts";
import { IProductRepository } from "../repository/product-interface.repository.ts";
import { ProductRepository } from "../repository/product/product.repository.ts";

export class ProductService {
  constructor(
    private productRepository: IProductRepository = new ProductRepository(),
    private companyRepository: ICompanyRepository = new CompanyRepository()
  ) {}

  async getAllProducts(): Promise<IProductResponse[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async createProduct(productEntity: IProductRequest): Promise<void> {
    const { name, description, company, category, price } = productEntity;

    //const productExists = await product.findOne({ name: name})

    //if (productExists) {
    // throw new Error('Produto já cadastrado')
    //}

    await this.productRepository.create({
      name: name,
      description: description,
      price: price,
      category: category,
      stock: 0,
      company: company,
    });
  }

  async getProductById(id: string): Promise<IProductResponse> {
    return await this.productRepository.findById(id);
  }

  async updateProduct(
    id: string,
    productEntity: IProductRequestUpdate
  ): Promise<void> {
    const { name, description, price, category, stock, company } =
      productEntity;

    const productFound = await this.productRepository.findById(id);

    if (!productFound) {
      throw new Error("Produto não encontrado");
    }

    if (productEntity.name !== productFound.name) {
      productEntity.name = name;
    }

    if (productEntity.description !== productFound.description) {
      productEntity.description = description;
    }

    if (productEntity.price !== productFound.price) {
      productEntity.price = price;
    }

    if (productEntity.stock !== productFound.stock) {
      productEntity.stock = stock;
    }

    await this.productRepository.findByIdAndUpdate(id, {
      name: name,
      description: description,
      price: price,
      stock: stock,
      company: company,
      category: category,
    });
  }

  async activeProductCreated(id: string): Promise<void> {
    const productFound = await this.productRepository.findById(id);
    if (!productFound) {
      throw new Error("Produto não encontrado");
    }
    await this.productRepository.updateActiveProduct(id);
  }

  async desactiveProduct(id: string) {
    const productFound = await this.productRepository.findById(id);
    if (!productFound) {
      throw new Error("Produto não encontrado");
    }
    await this.productRepository.updateDesactiveProduct(id);
  }

  async syncProductToCompany(id: string, companyId: string): Promise<void> {
    console.log("idService", id);
    console.log("companyService", companyId);
    const productFound = await this.productRepository.findById(id);

    if (!productFound) {
      throw new Error("Produto não encontrado");
    }

    const companyFound = await this.companyRepository.findById(companyId);

    if (!companyFound) {
      throw new Error("Empresa não encontrada");
    }

    await this.productRepository.updateCompany(id, companyId);
  }
}
