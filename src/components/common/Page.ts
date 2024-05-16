import { View } from '../base/View';
import { ensureElement } from '../../utils/utils';
import { IEventEmitter } from '../base/EventEmitter';

export class Page extends View<HTMLElement> {
	protected _pageWrapper: HTMLElement;

	constructor(
		container: HTMLElement,
		protected events: IEventEmitter,
	) {
		super(container);

		this._pageWrapper = ensureElement('.page__wrapper');
	}

	set locked(value: boolean) {
		if (value) {
			this._pageWrapper.classList.add('page__wrapper_locked');
		} else {
			this._pageWrapper.classList.remove('page__wrapper_locked');
		}
	}
}
