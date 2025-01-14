import { Router } from "express"
import { ProductController } from "../controller/product.controller.ts"

const productRoutes = Router()

const productController = new ProductController()

productRoutes.get('/', productController.getAllProducts)
productRoutes.post('/', productController.createProduct)
productRoutes.get('/:id', productController.getProductById)
productRoutes.put('/:id', productController.updateProduct)
productRoutes.post('/:id/approve', productController.approveProduct)
productRoutes.put('/:id/sync', productController.syncProductToCompany)

export { productRoutes }