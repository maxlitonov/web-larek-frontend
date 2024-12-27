import { Order, OrderResult } from "../view/Order";
import { IProduct } from "./AppState";


export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export interface ProductApi extends IProduct {

};

export interface ILarekApi {
  getProducts: () => Promise<ProductApi[]>
  orderProducts: (order: Order) => Promise<OrderResult>
};