import {
  IOrderResponse,
  IOrderRequest,
  OrderStatus,
} from "../model/order/order.interface.ts"
import { IProductResponse } from "../model/product/product.interface.ts"
import { IOrderRepository } from "../repository/oerder-interface.repository.ts"
import { OrderRepository } from "../repository/order/order.repository.ts"
import { IProductRepository } from "../repository/product-interface.repository.ts"
import { ProductRepository } from "../repository/product/product.repository.ts"

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository = new OrderRepository(),
    private productRepository: IProductRepository = new ProductRepository()
  ) {}

  async getAllOrders(): Promise<IOrderResponse[]> {
    return await this.orderRepository.find()
  }

  async createOrder(orderEntity: IOrderRequest): Promise<void> {
    const { company, user, products } = orderEntity

    await this.checkStock(products)
    const totalAmount = await this.calculatedTotal(products)
    await this.updateStock(orderEntity)
    //verificar como deixar o produto em separacao

    await this.orderRepository.createOrder({
      company: company,
      user: user,
      products: products,
      total: totalAmount,
      status: OrderStatus.PENDING,
    })
  }

  async getOrderById(id: string): Promise<IOrderResponse> {
    return await this.orderRepository.findById(id)
  }

  async updateStatusOrder(id: string): Promise<void> {
    const orderFound: IOrderResponse | null =
      await this.orderRepository.findById(id)
    if (!orderFound) {
      throw new Error("Order not found")
    }
    await this.updateStatus(orderFound)
  }

  async cancelOrder(id: string): Promise<void> {
    const orderFound: IOrderResponse | null =
      await this.orderRepository.findById(id)
    if (!orderFound) {
      throw new Error("Order not found")
    }
    if (orderFound.status === OrderStatus.CANCELED) {
      throw new Error("Order already canceled")
    }
    if (orderFound.status === OrderStatus.DELIVERED || orderFound.status === OrderStatus.DELIVERING) {
      throw new Error("Order already delivered")
    }
    await this.orderRepository.findByIdAndUpdate(orderFound._id, {
      status: OrderStatus.CANCELED,
    })
    const orderFoundCanceled: IOrderResponse | null = await this.orderRepository.findById(id)
    await this.updateStock(orderFoundCanceled)
  }

  async getProductById(products: any) {
    const productFound: IProductResponse | null = await this.productRepository.findById(products.product)
    if (!productFound) {
      throw new Error("Product not found")
    }
    return productFound
  }

  async checkStock(products: any): Promise<boolean> {
    for (const productItem of products) {
      const productDetails: IProductResponse = await this.getProductById(productItem)
      if (!productDetails || productDetails.stock < productItem.quantity) {
        throw new Error("Quantidade do produto indisponível")
      }
    }
    return true
  }

  async calculatedTotal(products: any): Promise<number> {
    let total = 0
    for (const productItem of products) {
      const productDetails: IProductResponse = await this.getProductById(productItem)
      if (productDetails) {
        total += productDetails.price * productItem.quantity
      } else {
        throw new Error("Product not found")
      }
    }
    return total
  }

  async updateStock(orderFound: any): Promise<void> {
    for (const productItem of orderFound.products) {
      const productDetails: IProductResponse = await this.getProductById(productItem)
      switch (orderFound.status) {
        case OrderStatus.CANCELED:
          await this.productRepository.findByIdAndUpdateStock(
            productItem.product,
            { stock: productDetails.stock + productItem.quantity }
          )
          break
        case OrderStatus.DELIVERED:
          await this.productRepository.findByIdAndUpdateStock(
            productItem.product,
            { stock: productDetails.stock - productItem.quantity }
          )
          break
      }
    }
  }

  async updateStatus(orderFound: IOrderResponse): Promise<void> {
    switch (orderFound.status) {
      case OrderStatus.PENDING:
        orderFound.status = OrderStatus.CONFIRMED
        break
      case OrderStatus.CONFIRMED:
        orderFound.status = OrderStatus.SEPARATING
        break
      case OrderStatus.SEPARATING:
        orderFound.status = OrderStatus.DELIVERING
        break
      case OrderStatus.DELIVERING:
        orderFound.status = OrderStatus.DELIVERED
        break
    }
    await this.orderRepository.findByIdAndUpdate(orderFound._id, {
      status: orderFound.status,
    })
  }
}
