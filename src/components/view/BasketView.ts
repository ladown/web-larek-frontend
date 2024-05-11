import { View } from '../base/View';
import { IBasketModel } from '../../types/';
import { ensureElement } from '../../utils/utils';

export class BasketView extends View<IBasketModel> {
	protected _trigger: HTMLButtonElement;
	protected _count: HTMLSpanElement;
	protected _title: HTMLTitleElement;
	protected _list: HTMLUListElement;
	protected _submit: HTMLButtonElement;
	protected _price: HTMLSpanElement;

	constructor(container: HTMLElement) {
		super(container);

		this._trigger = document.querySelector('.header__basket') as HTMLButtonElement;
		this._count = document.querySelector('.header__basket-counter') as HTMLSpanElement;
		this._title = ensureElement<HTMLTitleElement>('.modal__title', container);
		this._list = ensureElement<HTMLUListElement>('.basket__list', container);
		this._submit = ensureElement<HTMLButtonElement>('.basket__button', container);
		this._price = ensureElement<HTMLSpanElement>('.basket__price', container);
	}
}
