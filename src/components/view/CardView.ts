import { View } from '../base/View';
import { ICardViewActions } from '../../types/';
import { ensureElement } from '../../utils/utils';

export class CardView<T> extends View<T> {
	protected _category: HTMLSpanElement;
	protected _title: HTMLTitleElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLSpanElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement | HTMLButtonElement, actions?: ICardViewActions) {
		super(container);

		this._category = ensureElement<HTMLSpanElement>('.card__category', container);
		this._title = ensureElement<HTMLTitleElement>('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._price = ensureElement<HTMLSpanElement>('.card__price', container);
		this._button = container.querySelector('.button') || (container as HTMLButtonElement);

		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set price(value: string) {
		this.setText(this._price, value);
	}

	set categoryModifier(value: string) {
		this._category.classList.add(`card__category_${value}`);
	}
}
