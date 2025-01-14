import {
  IOrderResponse,
  IOrderRequest,
  OrderStatus,
} from "../model/order/order.interface.ts";
import { order } from "../model/order/order.model.ts";
import { IProductResponse } from "../model/product/product.interface.ts";
import { product } from "../model/product/product.model.ts";

export class OrderService {
  public async getAllOrders(): Promise<IOrderResponse[]> {
    const orders = await order.find();

    return orders as unknown as IOrderResponse[];
  }

  public async createOrder(orderEntity: IOrderRequest): Promise<void> {
    const { company, user, products, status } = orderEntity;

    await checkStock(products);
    const totalAmount = await calculatedTotal(products);
    //verificar como deixar o produto em separacao

    await order.create({
      company: company,
      user: user,
      products: products,
      total: totalAmount,
      status: status,
    });
  }

  public async getOrderById(id: string): Promise<IOrderResponse> {
    const orderFound: IOrderResponse = (await order.findById(
      id
    )) as IOrderResponse;
    return orderFound as IOrderResponse;
  }

  public async updateOrder(
    id: string,
    orderEntity: IOrderRequest
  ): Promise<void> {
    const { products } = orderEntity;

    const orderFound: IOrderResponse | null = await order.findById(id);
    if (!orderFound) {
      throw new Error("Order not found");
    }

    if (orderFound.status === OrderStatus.PENDING) {
      await checkStock(products);
      await updateStock(products);
      await updateStatus(orderFound);
    } else {
      await updateStatus(orderFound);
    }
  }
}

async function getProductById(products: any) {
  const productFound: IProductResponse | null = await product.findById(
    products.product
  );
  if (!productFound) {
    throw new Error("Product not found");
  }
  return productFound;
}

async function checkStock(products: any): Promise<boolean> {
  for (const productItem of products) {
    const productDetails: IProductResponse = await getProductById(productItem);
    if (!productDetails || productDetails.stock < productItem.quantity) {
      throw new Error("Quantidade do produto indisponível");
    }
  }
  return true;
}

async function calculatedTotal(products: any): Promise<number> {
  let total = 0;
  for (const productItem of products) {
    const productDetails: IProductResponse = await getProductById(productItem);
    if (productDetails) {
      total += productDetails.price * productItem.quantity;
    } else {
      throw new Error("Product not found");
    }
  }
  return total;
}

async function updateStock(products: any): Promise<void> {
  for (const productItem of products) {
    const productDetails: IProductResponse = await getProductById(productItem);
    if (productDetails) {
      await product.findByIdAndUpdate(
        { _id: productItem.product },
        { stock: productDetails.stock - productItem.quantity }
      );
    }
  }
}

async function updateStatus(orderFound: IOrderResponse): Promise<void> {
  switch (orderFound.status) {
    case OrderStatus.PENDING:
      orderFound.status = OrderStatus.CONFIRMED;
      break;
    case OrderStatus.CONFIRMED:
      orderFound.status = OrderStatus.SEPARATING;
      break;
    case OrderStatus.SEPARATING:
      orderFound.status = OrderStatus.DELIVERING;
      break;
    case OrderStatus.DELIVERING:
      orderFound.status = OrderStatus.DELIVERED;
      break;
  }
  await order.findByIdAndUpdate(
    { _id: orderFound._id },
    { status: orderFound.status }
  );
}
