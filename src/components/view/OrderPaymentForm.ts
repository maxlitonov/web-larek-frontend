import { Form } from '../common/Form';
import {
	TOrderPayment,
	TOrderPaymentMethod,
} from '../../types/components/view/Order';
import { IEvents } from '../../types/components/base/EventEmitter';
import { ensureElement } from '../../utils/utils';

export class OrderPaymentForm extends Form<TOrderPayment> {
	protected _address: HTMLInputElement;
	protected _paymentCash: HTMLButtonElement;
	protected _paymentCard: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._address = ensureElement<HTMLInputElement>(
			'.form__input[name=address]',
			this.container
		);
		this._paymentCash = ensureElement<HTMLButtonElement>(
			'.button_alt[name=cash]',
			this.container
		);
		this._paymentCard = ensureElement<HTMLButtonElement>(
			'.button_alt[name=card]',
			this.container
		);
		this._paymentCash.addEventListener('click', () => {
			this.payment = 'cash';
			this.onInputChange('payment', 'cash');
		});
		this._paymentCard.addEventListener('click', () => {
			this.payment = 'card';
			this.onInputChange('payment', 'card');
		});
	}

	set address(value: string) {
		this._address.value = value;
	}

	set payment(value: TOrderPaymentMethod) {
		this.toggleClass(this._paymentCard, 'button_alt-active', value === 'card');
		this.toggleClass(this._paymentCash, 'button_alt-active', value === 'cash');
	}
}
