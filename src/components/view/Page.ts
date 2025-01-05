import { IEvents } from '../../types/components/base/EventEmitter';
import { IPage } from '../../types/components/view/Page';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Page extends Component<IPage> {
	protected _productContainer: HTMLElement;
	protected _basketCounterContainer: HTMLElement;
	protected _wrapperContainer: HTMLElement;
	protected _basketContainer: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._wrapperContainer = ensureElement<HTMLElement>('.page__wrapper');
		this._productContainer = ensureElement('.gallery', this.container);
		this._basketCounterContainer = ensureElement(
			'.header__basket-counter',
			this.container
		);
		this._basketContainer = ensureElement<HTMLElement>(
			'.header__basket',
			this.container
		);

		this._basketContainer.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set productList(products: HTMLElement[]) {
		this._productContainer.replaceChildren(...products);
	}

	set basketCounter(value: number) {
		this.setText(this._basketCounterContainer, value);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapperContainer.classList.add('page__wrapper_locked');
		} else {
			this._wrapperContainer.classList.remove('page__wrapper_locked');
		}
	}
}
