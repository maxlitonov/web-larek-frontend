import { IEvents } from '../../types/components/base/EventEmitter';
import { TOrderContacts } from '../../types/components/view/Order';
import { ensureElement } from '../../utils/utils';
import { Form } from '../common/Form';

export class OrderContactsForm extends Form<TOrderContacts> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._email = ensureElement<HTMLInputElement>(
			'.form__input[name=email]',
			this.container
		);
		this._phone = ensureElement<HTMLInputElement>(
			'.form__input[name=phone]',
			this.container
		);
	}

	set email(value: string) {
		this._email.value = value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}
}
