import { IEventEmitter } from './EventEmitter';

export abstract class Presenter<T, K> {
	constructor(
		protected events: IEventEmitter,
		protected _model: T,
		protected _view: K,
	) {}

	get model(): T {
		return this._model;
	}

	get view(): K {
		return this._view;
	}
}
