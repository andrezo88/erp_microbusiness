import { ProductController } from "../../controller/product.controller.ts"
import { ProductRepository } from "../../repository/product/product.repository.ts"
import { ProductService } from "../../service/product.service.ts"

const ProductFactory = () => {
    
    const productRepository = new ProductRepository()
    const productService = new ProductService(productRepository)
    const productController = new ProductController(productService)
    return productController
}

export const productFactory = ProductFactory()