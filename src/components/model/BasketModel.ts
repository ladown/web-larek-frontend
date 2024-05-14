import { Model } from '../base/Model';
import { IBasketModel } from '../../types';
import { IEventEmitter } from '../base/EventEmitter.js';

export class BasketModel extends Model<IBasketModel> {
	protected _count: number;
	protected _items: string[];
	protected _total: number;

	constructor(data: Partial<IBasketModel>, events: IEventEmitter) {
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

	set items(value: string | string[]) {
		this._items.push(...(Array.isArray(value) ? value : [value]));
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

	clearState() {
		this.count = 0;
		this.items = [];
		this.total = 0;
	}
}
