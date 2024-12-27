import { IEvents } from "../../types/components/base/EventEmitter";
import { Model } from "../base/Model";
import { Order } from "../../types/components/view/Order";
import { IAppState, IProduct } from "../../types/components/model/AppState";

export class AppState extends Model <IAppState> {
  items: IProduct[] = [];
  basket: string[] = [];
	basketTotal: number = 0;

	order: Order = {
		payment: 'card',
		address: '',
		email: '',
		tel: ''
	};

	// Инициализация массива
	setItems(items: IProduct[]) {
		this.items = items;
		this.emitChanges('cards:changed');
	}

	getItems() {
		return this.items;
	}
	
	// Добавить в корзину
	addToBasket(product: IProduct) {
		this.basket.push(product.id);
		this.basketTotal += product.price;
		this.events.emit('basket:change', this.basket);
	};

	// Удалить из корзины
	removeFromBasket(product: IProduct) {
		this.basket = this.basket.filter(id => id !== product.id);
		this.basketTotal -= product.price;
		this.events.emit('basket:change');
	};
	
	// Получить кол-во в корзине
	getBasketTotal(): number {
		return this.basketTotal;
	};

	// Очистить корзину
	clearBasket() {

	}
  
}