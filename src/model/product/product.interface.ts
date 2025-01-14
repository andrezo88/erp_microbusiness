export interface IProductRequest {
 name: string
 description: string
 price: number
 catete: Categories
}

export interface IProductResponse {
 id: string
 name: string
 description: string
 category: Categories
 price: number
 stock: number
 company: string
}

export interface IProductRequestUpdate {
 name: string
 description: string
 catete: Categories
 price: number
 stock: number
 company: string
}

export enum Categories {
 HOBBY = "HOBBY",
 FASHION = "FASHION",
 FOOD = "FOOD",
 ELECTRONIC = "ELECTRONIC",
}