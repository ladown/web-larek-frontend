import { View } from '../base/View';
import { TCardBasketView, ICardViewActions } from '../../types/';
import { ensureElement } from '../../utils/utils';

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

		this._button.addEventListener('click', () => {
			actions?.onClick?.();
		});
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
