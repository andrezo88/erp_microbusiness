import { IOrderRequest, IOrderResponse, IOrderStatusUpdate, OrderStatus } from "../../model/order/order.interface.ts"
import { order } from "../../model/order/order.model.ts"
import { IOrderRepository } from "../oerder-interface.repository.ts"

export class OrderRepository implements IOrderRepository {

    async createOrder(orderEntity: IOrderRequest): Promise<void> {
        await order.create({
            company: orderEntity.company,
            user: orderEntity.user,
            products: orderEntity.products,
            total: orderEntity.total,
            status: orderEntity.status
        })
    }

    async find(): Promise<IOrderResponse[]> {
        const orders = await order.find()
        return orders.map(o => ({
            _id: o._id.toString(),
            company: o.company.toString(),
            user: o.user.toString(),
            products: o.products.map(product => ({
                product: product.product.toString(),
                quantity: product.quantity
            })),
            total: o.total,
            status: o.status as OrderStatus
        }))
    }

    async findById(id: string): Promise<IOrderResponse> {
        const orderFound = await order.findById(id)
        return {
            _id: orderFound?._id.toString(),
            company: orderFound?.company.toString(),
            user: orderFound?.user.toString(),
            products: orderFound?.products.map(product => ({
                product: product.product.toString(),
                quantity: product.quantity
            })),
            total: orderFound?.total,
            status: orderFound?.status
        } as IOrderResponse
    }

    async findByIdAndUpdate(id: string, orderEntity: IOrderRequest): Promise<void> {
        await order.findByIdAndUpdate(id, {
            company: orderEntity.company,
            user: orderEntity.user,
            products: orderEntity.products,
            total: orderEntity.total,
            status: orderEntity.status
        })
    }

    async findByIdAndUpdateStock(id: string, orderEntity: IOrderStatusUpdate): Promise<void> {
        await order.findByIdAndUpdate(id, {
            status: orderEntity.status
        })
    }
    
}

