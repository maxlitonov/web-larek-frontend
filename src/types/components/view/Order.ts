export interface Order {
	payment: 'card' | 'cash';
	address: string;
	email: string;
	tel: number;
}

export interface OrderResult extends Order{
  id: number;
}

export type OrderPayment = Pick<Order, 'payment' | 'address'>;

export type OrderContacts = Pick<Order, 'email' | 'tel'>;
