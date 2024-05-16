import { Model } from '../base/Model';
import { IBasketModel, IEventEmitter } from '../../types';
import { CardModel } from './CardModel.js';

export class BasketModel extends Model<IBasketModel<string>> {
	protected _count: number;
	protected _items: string[];
	protected _total: number;

	constructor(data: Partial<IBasketModel<string>>, events: IEventEmitter) {
		super(data, events);

		this._count = 0;
		this._items = [];
		this._total = 0;
	}

	set count(value: number) {
		this._count = value;
	}

	get count(): number {
		return this._count;
	}

	set items(value: CardModel | CardModel[]) {
		(Array.isArray(value) ? value : [value]).forEach((item) => {
			this._items.push(item.id);

			if (typeof item.price === 'number') {
				this.total = item.price;
			}

			this.count += 1;
		});
	}

	get items(): string[] {
		return this._items;
	}

	set total(value: number) {
		this._total += value;
	}

	get total(): number {
		return this._total;
	}

	clearState() {
		this.count = 0;
		this.items = [];
		this.total = 0;
	}
}
