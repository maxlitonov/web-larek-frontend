import { Model } from '../base/Model';
import {
	IOrder,
	TOrder,
	TOrderContactsForm,
	TOrderForm,
	TOrderPaymentMethod,
} from '../../types/components/view/Order';
import {
	FormErrors,
	IAppState,
	IProduct,
} from '../../types/components/model/AppState';

export class AppState extends Model<IAppState> {
	items: IProduct[] = [];
	basket: string[] = [];
	basketTotal: number = 0;
	order: IOrder = {
		payment: 'card',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	preview: string | null;
	formErrors: FormErrors = {};

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
	}

	// Удалить из корзины
	removeFromBasket(product: IProduct) {
		this.basket = this.basket.filter((id) => id !== product.id);
		this.basketTotal -= product.price;
		this.events.emit('basket:changed');
	}

	// Очистить корзину
	resetBasket() {
		this.basket = [];
		this.basketTotal = 0;
		this.events.emit('basket:changed');
	}

	// Очистить order
	resetOrder() {
		this.order = {
			email: '',
			phone: '',
			address: '',
			payment: 'card',
			total: 0,
			items: [],
		};
	}

	// Validation order
	setOrderField(field: keyof TOrderForm, value: string) {
		if (field === 'payment') {
			this.order[field] = value as TOrderPaymentMethod;
		} else {
			this.order[field] = value;
		}
		this.validateOrderForm();
	}

	setContactField(field: keyof TOrderContactsForm, value: string) {
		this.order[field] = value;
		this.validateContactsOrderForm();
	}

	validateOrderForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('orderFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContactsOrderForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('contactsFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
