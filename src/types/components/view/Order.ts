export interface IOrder {
	payment: TOrderPaymentMethod;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

export type TOrder = Omit<IOrder, 'items' | 'total'>;

export type TOrderForm = Pick<IOrder, 'payment' | 'address'>;

export type TOrderContactsForm = Pick<IOrder, 'email' | 'phone'>;

export type TOrderPaymentMethod = 'cash' | 'card';

export interface IOrderResult {
	id: string;
	total: number;
}
