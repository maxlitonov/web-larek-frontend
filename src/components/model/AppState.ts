import { IEvents } from "../../types/components/base/EventEmitter";
import { Model } from "../base/Model";
import { Order } from "../../types/components/view/Order";
import { FormErrors, IAppState, IProduct } from "../../types/components/model/AppState";

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

	preview: string | null;
  formErrors: FormErrors = {}

	// Инициализация массива
	setItems(items: IProduct[]) {
		this.items = items;
		this.emitChanges('card:changed');
	}

	// Получение массива
	getItems() {
		return this.items;
	}

	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
}
	
	// Добавить в корзину
	addToBasket(product: IProduct) {
		this.basket.push(product.id);
		this.basketTotal += product.price;
		this.events.emit('basket:changed', this.basket);
	};

	// Удалить из корзины
	removeFromBasket(product: IProduct) {
		this.basket = this.basket.filter(id => id !== product.id);
		this.basketTotal -= product.price;
		this.events.emit('basket:changed');
	};

	// Очистить корзину
	clearBasket() {

	}
  
}