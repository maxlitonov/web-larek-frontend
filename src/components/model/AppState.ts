import { Model } from "../base/Model";
import { IOrder, TOrderContacts, TOrderPaymentMethod } from "../../types/components/view/Order";
import { FormErrors, IAppState, IProduct } from "../../types/components/model/AppState";

export class AppState extends Model <IAppState> {
  items: IProduct[] = [];
  basket: string[] = [];
	basketTotal: number = 0;
	order: IOrder = {
		payment: 'card',
		address: '',
		email: '',
		phone: '',
		items: []
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

	// Задать preview
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
		this.basket = [];
		this.basketTotal = 0;
		this.events.emit('basket:change');
	}

	// Задать оплату
	setPayment(method: TOrderPaymentMethod) {
		this.order.payment = method;
	}

	// Очистить order
	clearOrder() {
		this.order = {
			email: '',
			phone: '',
			address: '',
			payment: 'card',
			items: []
		};
	}

	setOrderField(field: keyof TOrderContacts, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
				this.events.emit('order:ready', this.order);
		}
}

validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
				errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
				errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('paymentFormErrors:changed', this.formErrors);
		return Object.keys(errors).length === 0;
}

  
}