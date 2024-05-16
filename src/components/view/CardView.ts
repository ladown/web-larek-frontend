import { View } from '../base/View';
import { TCardCatalogView, TCardBasketView, TCardPreviewView, ICardViewActions } from '../../types/';
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

export class CardCatalogView extends CardView<TCardCatalogView> {
	constructor(container: HTMLButtonElement, actions?: ICardViewActions) {
		super(container, actions);
	}
}

export class CardPreviewView extends CardView<TCardPreviewView> {
	protected _description: HTMLParagraphElement;

	constructor(container: HTMLElement, actions?: ICardViewActions) {
		super(container, actions);

		this._description = ensureElement<HTMLParagraphElement>('.card__text', container);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set buttonState(value: boolean) {
		this.setDisabled(this._button, value);
		this.setText(this._button, value ? 'Уже в корзине' : 'В корзину');
	}
}

export class CardBasketView extends View<TCardBasketView> {
	protected _label: HTMLSpanElement;
	protected _title: HTMLSpanElement;
	protected _price: HTMLSpanElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardViewActions) {
		super(container);

		this._label = ensureElement<HTMLSpanElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLSpanElement>('.card__title', container);
		this._price = ensureElement<HTMLSpanElement>('.card__price', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);

		if (actions?.onClick) {
			this._button.addEventListener('click', () => {
				actions.onClick();
			});
		}
	}

	set label(value: number) {
		this.setText(this._label, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: string) {
		this.setText(this._price, value);
	}
}
