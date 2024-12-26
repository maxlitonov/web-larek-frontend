import { IEvents } from "../../types/components/base/EventEmitter";
import { Model } from "../base/Model";
import { Order } from "../../types/components/view/Order";
import { IAppState, Product } from "../../types/components/model/AppState";

export class AppState extends Model <IAppState> {
  items: Product[] = [];
  basket: Product[] = [];
	basketTotal: number;

	order: Order = {
		payment: 'card',
		address: '',
		email: '',
		tel: ''
	};

	// Инициализация массива
	setItems(items: Product[]) {
		this.items = items;
		this.emitChanges('cards:changed');
	}

	getItems() {
		return this.items;
	}
	
	// Добавить в корзину
	addToBasket(product: Product) {
		this.basket.push(product);
		this.basketTotal += product.price;
	};

	// Удалить из корзины
	removeFromBasket(product: Product) {
		this.basket = this.basket.filter(item => item.id !== product.id);
		this.basketTotal -= product.price;
	};
	
	// Получить кол-во в корзине
	getBasketTotal(): number {
		return this.basketTotal;
	};

	// Очистить корзину
	clearBasket() {

	}
  
}