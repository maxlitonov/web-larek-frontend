import './scss/styles.scss';
import { EventEmitter } from './components/base/EventEmitter';
import { AppState } from './components/model/AppState';
import { larekApi } from './components/model/LarekApi';
import { actionsCard, API_URL, CDN_URL } from './utils/constants';
import { Card } from './components/view/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { IProduct } from './types/components/model/AppState';
import { Modal } from './components/common/Modal';
import { Basket } from './components/view/Basket';
import { OrderPaymentForm } from './components/view/OrderPaymentForm';
import { OrderContactsForm } from './components/view/OrderContactsForm';
import { Success } from './components/view/Success';
import { TOrderContactsForm, TOrderForm } from './types/components/view/Order';

// Шаблоны
const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;

// Брокер событий
const events = new EventEmitter();

// Модель данных приложения
const appState = new AppState({}, events);

// api приложения
const api = new larekApi(CDN_URL, API_URL);

// Глобальные контейнеры
const page = new Page(
	document.querySelector('.page__wrapper') as HTMLElement,
	events
);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderPaymentForm(cloneTemplate(orderTemplate), events);
const contactsForm = new OrderContactsForm(
	cloneTemplate(contactsTemplate),
	events
);

// Инициализация массива
events.on('card:changed', () => {
	const itemsHTMLArray = appState.getItems().map((item) =>
		new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		}).render(item)
	);
	page.render({
		productList: itemsHTMLArray,
		basketCounter: appState.basket.length,
	});
});

// Открыть карточку
events.on('card:select', (item: IProduct) => {
	appState.setPreview(item);
});

// Изменен открытый выбранный лот
events.on('preview:changed', (item: IProduct) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (appState.basket.includes(item.id)) {
				appState.removeFromBasket(item);
				card.button = actionsCard['add'];
			} else {
				appState.addToBasket(item);
				card.button = actionsCard['delete'];
			}
		},
	});
	card.button = appState.basket.includes(item.id)
		? actionsCard['delete']
		: actionsCard['add'];
	modal.render({
		content: card.render(item),
	});
});

// Открыть корзину
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// Изменения в корзине
events.on('basket:changed', () => {
	basket.items = appState.basket.map((id) => {
		const item = appState.items.find((item) => item.id === id);
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => appState.removeFromBasket(item),
		});
		return card.render(item);
	});
	basket.total = appState.basketTotal;
	page.render({
		basketCounter: appState.basket.length,
	});
});

// Отркыть payment order
events.on('order:open', () => {
	appState.resetOrder();
	modal.render({
		content: orderForm.render({
			payment: 'card',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Кнопка submit payment
events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// Кнопка submit contacts
events.on('contacts:submit', () => {
	api
		.orderProducts({
			...appState.order,
			total: appState.basketTotal,
			items: appState.basket.map((item) => item),
		})
		.then((res) => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick() {
					modal.close();
					appState.resetBasket();
					appState.resetOrder();
				},
			});
			modal.render({
				content: success.render({
					total: res.total,
				}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Validation fields form
events.on(
	/^order\..*:change/,
	(data: { field: keyof TOrderForm; value: string }) => {
		appState.setOrderField(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof TOrderContactsForm; value: string }) => {
		appState.setContactField(data.field, data.value);
	}
);

events.on('orderFormErrors:change', (errors: Partial<TOrderForm>) => {
	const { address, payment } = errors;
	orderForm.valid = !payment && !address;
	orderForm.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	'contactsFormErrors:change',
	(errors: Partial<TOrderContactsForm>) => {
		const { email, phone } = errors;
		contactsForm.valid = !email && !phone;
		contactsForm.errors = Object.values({ email, phone })
			.filter((i) => !!i)
			.join('; ');
	}
);

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получаем products с сервера
api
	.getProducts()
	.then((data) => {
		appState.setItems(data);
	})
	.catch((err) => {
		console.error(err);
	});
