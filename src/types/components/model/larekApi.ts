import { Order, OrderResult } from "../view/Order";

export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface ILarekApi {
  getProducts: () => Promise<Product[]>
  orderProducts: (order: Order) => Promise<OrderResult[]>
}