export interface IProductRequest {
  name: string;
  description: string;
  price: number;
  category: Categories;
  stock: number;
  company: string;
}

export interface IProductResponse {
  _id: string;
  name: string;
  description: string;
  category: Categories;
  price: number;
  stock: number;
  company: string[];
}

export interface IProductRequestUpdate {
  name: string;
  description: string;
  category: Categories;
  price: number;
  stock: number;
  company: string;
}

export interface IProductRequestUpdatePriceAndStock {
  price: number;
  stock: number;
}

export interface IProductRequestUpdateStock {
  stock: number;
}

export enum Categories {
  HOBBY = "HOBBY",
  FASHION = "FASHION",
  FOOD = "FOOD",
  ELECTRONIC = "ELECTRONIC",
}
