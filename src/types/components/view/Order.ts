export interface IOrder {
	payment: TOrderPaymentMethod;
	address: string;
	email: string;
	phone: string;
	items: [];
}

export type TOrder = Omit<IOrder, 'items' | 'total'>

export type TOrderPayment = Pick<IOrder, 'payment' | 'address'>;

export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;

export type TOrderPaymentMethod = 'cash' | 'card';


export interface IOrderResult extends IOrder{
  id: string;
	total: number;
}