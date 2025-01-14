import { Response, NextFunction } from "express"
import { CustomRequest } from "../model/custom-request/express.model.ts"
import httpStatus from "http-status"
import { errorHandler } from "../utils/error-handler.ts"
import { ProductService } from "../service/product.service.ts"
import { IProductRequest, IProductResponse } from "../model/product/product.interface.ts"
import { schemaProductUpdate } from "../schema/schemaProduct.ts"
import { HttpException } from "../utils/Http-exception.ts"
import { schemaCreateProduct } from "../schema/productSchema.ts"

const productService = new ProductService()

export class ProductController {

 public async getAllProducts(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const products = await productService.getAllProducts()
   res.status(httpStatus.OK).json(products)
  } catch (error) {
   next(errorHandler("getAllProducts", error))
  }
 }

 public async createProduct(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const user: IProductRequest = req.body
   const { value, error } = schemaCreateProduct.validate(user)

   if (error) {
    throw new HttpException(
     httpStatus.UNPROCESSABLE_ENTITY,
     error.details[0].message
    );
   }

   const product = await productService.createProduct(value)
   res.status(httpStatus.CREATED).json(product)
  } catch (error) {
   next(errorHandler("createProduct", error))
  }
 }

 public async getProductById(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const { id } = req.params
   const product = await productService.getProductById(id)
   res.status(httpStatus.OK).json(product)
  } catch (error) {
   next(errorHandler("getProductById", error))
  }
 }

 public async updateProduct(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const { id } = req.params
   const user: IProductRequest = req.body
   const { value, error } = schemaProductUpdate.validate(user)

   if (error) {
    throw new HttpException(
     httpStatus.UNPROCESSABLE_ENTITY,
     error.details[0].message
    )
   }

   await productService.updateProduct(id, value)
   res.status(httpStatus.OK).send()
  } catch (error) {
   next(errorHandler("updateProduct", error))
  }
 }

 public async approveProduct(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const { id } = req.params;
   await productService.approveProduct(id)
   res.status(httpStatus.OK).send()
  } catch (error) {
   next(errorHandler("approveProduct", error))
  }
 }

 public async syncProductToCompany(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const { id } = req.params
   const companyId = req.body.companyId
   await productService.syncProductToCompany(id, companyId)
   res.status(httpStatus.OK).send()
  } catch (error) {
   next(errorHandler("syncProductToCompany", error))
  }
 }

}