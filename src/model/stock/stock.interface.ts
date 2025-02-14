export interface IStockRequest {
  nf: string
  company: string
  price: number
  quantity: number
  product: string
  user: string
}

export interface IStockUpdateStock {
  quantity: number
}
