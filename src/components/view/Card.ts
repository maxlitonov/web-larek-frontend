import { IProduct } from "../../types/components/model/AppState";
import { ICardActions, categories } from "../../types/components/view/Card";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Card extends Component<IProduct> {
  protected _id: number;
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _title: HTMLElement;
  protected _category?: HTMLElement;
  protected _price: HTMLElement;
  protected _button?: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._description = container.querySelector('.card__text') as HTMLElement;
    this._image = container.querySelector('.card__image') as HTMLImageElement;
    this._title = ensureElement<HTMLElement>('.card__title', container) as HTMLElement;
    this._category = container.querySelector('.card__category') as HTMLElement;
    this._price = ensureElement<HTMLElement>('.card__price', container) as HTMLElement;
    this._button = container.querySelector('.card__button') as HTMLButtonElement;

    if (actions?.onClick) {
      if (this._button) {
          this._button.addEventListener('click', actions.onClick);
      } else {
          container.addEventListener('click', actions.onClick);
      }
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id() {
    return this.container.dataset.id || '';
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  get description() {
    return this._description.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title() {
    return this._title.textContent || '';
  }

  set category(value: string) {
		this.setText(this._category, value);
		this._category.classList.add(`card__category_${categories.has(value)? categories.get(value): 'other' }`)
  }

  set price(value: number) {
    this.setText(this._price, value ? `${value} синапсов`: 'Бесценно');
    this.setDisabled(this._button, !value)
  }

  set button(value: string) {
		this.setText(this._button, value);
	}
}