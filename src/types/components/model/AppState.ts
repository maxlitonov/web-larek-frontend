import { Order, OrderResult } from "../view/Order";
import { Product } from "./larekApi";

// Какие модальные окна у нас есть
export enum AppStateModals {
	basket = 'modal:basket',
	contacts = 'modal:contacts',
  payment = 'modal:payment',
	success = 'modal:success',
	none = 'modal:none',
}

// Модель данных приложения
export interface AppState {
  // Загружаемые с сервера данные
  products: Product[];

  // Заполняемые пользователем данные
  basket: Product[];
  basketTotal: number;
  order: Order;

  // Состояние интерфейса
  openedModal: AppStateModals;
  isOrderReady: boolean;
  modalMessage: string | null;
  isError: boolean;

  // Действия с API
  loadProducts(): Promise<void>
  orderProducts: (order: Order) => Promise<OrderResult[]>

  // Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;

  // Методы связанные с корзиной
  addToBasket(prodcut: Product): void;

  getTotal(): number;
  
  clearBasket(): void;
}