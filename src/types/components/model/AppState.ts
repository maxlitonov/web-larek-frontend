import { IOrder } from '../view/Order';

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

// Модель данных приложения
export interface IAppState {
	items: IProduct[];
	basket: string[];
	basketTotal: number;
	order: IOrder;
	preview: string | null;
	formErrors: FormErrors;
}