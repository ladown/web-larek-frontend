import { View } from '../base/View';
import { IBasketModel, IEventEmitter } from '../../types/';
import { ensureElement, formatNumber } from '../../utils/utils';

export class BasketView extends View<IBasketModel<HTMLElement>> {
	protected _trigger: HTMLButtonElement;
	protected _count: HTMLSpanElement;
	protected _title: HTMLTitleElement;
	protected _list: HTMLUListElement;
	protected _actions: HTMLElement;
	protected _submit: HTMLButtonElement;
	protected _price: HTMLSpanElement;
	protected emptyState: HTMLElement;

	constructor(
		container: HTMLElement,
		protected events: IEventEmitter,
		emptyState: HTMLElement,
	) {
		super(container);

		this._trigger = document.querySelector('.header__basket') as HTMLButtonElement;
		this._count = document.querySelector('.header__basket-counter') as HTMLSpanElement;
		this._title = ensureElement<HTMLTitleElement>('.modal__title', container);
		this._list = ensureElement<HTMLUListElement>('.basket__list', container);
		this._actions = ensureElement<HTMLUListElement>('.modal__actions', container);
		this._submit = ensureElement<HTMLButtonElement>('.basket__button', container);
		this._price = ensureElement<HTMLSpanElement>('.basket__price', container);

		this.emptyState = emptyState;

		this._trigger.addEventListener('click', () => {
			this.events.emit('basket:open');
		});

		this._submit.addEventListener('click', () => {
			this.events.emit('order:open-step-details');
		});

		this.items = [];
	}

	set count(value: number) {
		this.setText(this._count, value);
	}

	set total(value: number) {
		const totalValue = `${formatNumber(value)} синапсов`;
		this.setText(this._price, totalValue);
	}

	set items(value: HTMLElement[]) {
		if (value?.length) {
			this.toggleEmptyState(false);
			this._list.replaceChildren(...value);
		} else {
			this.toggleEmptyState(true);
		}
	}

	toggleEmptyState(state: boolean) {
		if (state) {
			this.setHidden(this._title);
			this.setHidden(this._actions);
			this._list.replaceChildren(this.emptyState);
		} else {
			this.setVisible(this._title);
			this.setVisible(this._actions);
		}
	}
}
