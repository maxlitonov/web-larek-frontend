import { Order, OrderResult } from "../view/Order";
import { Product } from "./AppState";


export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export interface ProductApi extends Product {

};

export interface ILarekApi {
  getProducts: () => Promise<ProductApi[]>
  orderProducts: (order: Order) => Promise<OrderResult>
};