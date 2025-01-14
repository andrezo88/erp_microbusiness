export interface IOrderRequest {
 company: string
 user: string
 products: Array<{
  product: string
  quantity: number
 }>
 total: number
 status: OrderStatus
}

export interface IOrderResponse {
 _id: string
 company: string
 user: string
 products: Array<{
  product: string
  quantity: number
 }>
 total: number
 status: OrderStatus
}

export enum OrderStatus {
 PENDING = 'PENDING',
 CONFIRMED = 'CONFIRMED',
 SEPARATING = 'SEPARATING',
 DELIVERING = 'DELIVERING',
 DELIVERED = 'DELIVERED',
 CANCELED = 'CANCELED',
}