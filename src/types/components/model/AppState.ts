import { Order, OrderResult } from "../view/Order";

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export type FormErrors = Partial<Record<keyof Order, string>>;

// Модель данных приложения
export interface IAppState {
  // Загружаемые с сервера данные
  items: IProduct[];

  // Заполняемые пользователем данные
  basket: IProduct[];
  basketTotal: number;
  order: Order;

  // Действия с API
  loadProducts(): Promise<void>
  orderProducts: (order: Order) => Promise<OrderResult[]>

  // Методы для работы с модальными окнами

  setItems(items: IProduct[]):void;

  addToBasket(prodcut: IProduct): void;

  removeFromBasket(id: number): void;

  getTotal(): number;
  
  clearBasket(): void;
}