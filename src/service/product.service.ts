import { ICompanyResponse } from "../model/company/company.interface.ts";
import { company } from "../model/company/company.model.ts";
import { IProductRequest, IProductRequestUpdate, IProductResponse } from "../model/product/product.interface.ts"
import { product } from "../model/product/product.model.ts"


export class ProductService {

 public async getAllProducts(): Promise<IProductResponse[]> {
  const products = await product.find()
  return products.map((p: any) => ({
   id: p.id,
   name: p.name,
   description: p.description,
   category: p.category,
   price: p.price,
   stock: p.stock,
   company: p.company
  }));
 }

 public async createProduct(productEntity: IProductRequest): Promise<void> {

  const { name, description, price } = productEntity

  //const productExists = await product.findOne({ name: name})

  //if (productExists) {
  // throw new Error('Produto já cadastrado')
  //}

  await product.create({
   name: name,
   description: description,
   price: price,
  });
 }

 public async getProductById(id: string): Promise<IProductResponse> {

  const productFound: IProductResponse = await product.findById(id) as IProductResponse

  return {
   id: productFound.id,
   name: productFound.name,
   description: productFound.description,
   category: productFound.category,
   price: productFound.price,
   stock: productFound.stock,
   company: productFound.company
  };
 }

 public async updateProduct(id: string, productEntity: IProductRequestUpdate): Promise<void> {

  const {
   name,
   description,
   price,
   stock,
   company
  } = productEntity

  const productFound = await product.findById(id)

  if (!productFound) {
   throw new Error('Produto não encontrado')
  }

  if (productEntity.name !== productFound.name) {
   productEntity.name = name
  }

  if (productEntity.description !== productFound.description) {
   productEntity.description = description
  }

  if (productEntity.price !== productFound.price) {
   productEntity.price = price
  }

  if (productEntity.stock !== productFound.stock) {
   productEntity.stock = stock
  }


  await product.findByIdAndUpdate(id, {
   name: name,
   description: description,
   price: price,
   stock: stock,
   company: company
  })
 }

 public async approveProduct(id: string): Promise<void> {
  const productFound = await product.findById(id) as IProductResponse

  if (!productFound) {
   throw new Error('Produto não encontrado')
  }

  await product.updateOne(
   { _id: id },
   { isActive: true }
  )
 }

 public async syncProductToCompany(id: string, companyId: string): Promise<void> {
  const productFound = await product.findById(id) as IProductResponse

  if (!productFound) {
   throw new Error('Produto não encontrado')
  }

  const companyFound = await company.findById(companyId) as ICompanyResponse

  if (!companyFound) {
   throw new Error('Empresa não encontrada')
  }

  await product.updateOne(
   { _id: id },
   { $push: { company: companyFound.document } }
  )
 }

}