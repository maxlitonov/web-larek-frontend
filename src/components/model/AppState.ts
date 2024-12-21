import { IEvents } from "../../types/components/base/EventEmitter";
import { Model } from "../base/Model";
import { Order } from "../../types/components/view/Order";
import { AppStateModals, Product } from "../../types/components/model/AppState";

export class AppState extends Model <AppState> {
  items: Product[];
  basket: Product[];
	basketTotal: number;

	order: Order = {
		payment: 'card',
		address: '',
		email: '',
		tel: ''
	};
	
	// Состояние интерфейса
	openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;
	
	// Методы для работы с модальными окнами
	// openModal(modal: AppStateModals) {

	// };

	// setMessage(message: string | null, isError: boolean) {

	// };

	// Инициализация массива
	setItems(items: Product[]) {
		this.items = items;
	}
	
	// Добавить в корзину
	addToBasket(prodcut: Product) {

	};

	// Удалить из корзины
	removeFromBasket(id: number) {

	};
	
	// Получить кол-во в корзине
	getTotal(): number {
		return this.basketTotal;
	};

	// Очистить корзину
	clearBasket() {

	}
  
}