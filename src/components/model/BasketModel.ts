import { Model } from '../base/Model';
import { IBasketModel, IEventEmitter } from '../../types';
import { CardModel } from './CardModel.js';

export class BasketModel extends Model<IBasketModel<string>> {
	protected _count: number;
	protected _items: string[];
	protected _total: number;

	constructor(data: Partial<IBasketModel<string>>, events: IEventEmitter) {
		super(data, events);

		this.resetState();
	}

	set count(value: number) {
		this._count = value;
	}

	get count(): number {
		return this._count;
	}

	set items(value: string | string[]) {
		this._items = Array.isArray(value) ? value : [value];
	}

	get items(): string[] {
		return this._items;
	}

	set total(value: number) {
		this._total = value;
	}

	get total(): number {
		return this._total;
	}

	addCardToBasket(card: CardModel) {
		card.isInBasket = true;

		this.items.push(card.id);

		if (typeof card.price === 'number') {
			this.total += card.price;
		}

		this.count += 1;

		this.events.emit('basket:change');
	}

	removeCardFromBasket(card: CardModel) {
		card.isInBasket = false;

		if (typeof card.price === 'number') {
			this.total -= card.price;
		}

		this.count -= 1;

		this.items = this.items.filter((id) => id !== card.id);

		this.events.emit('basket:change');
	}

	resetState() {
		this.count = 0;
		this.items = [];
		this.total = 0;
	}
}
