import { View } from '../base/View';
import { ILoaderView } from '../../types/';
import { ensureElement } from '../../utils/utils';

export class LoaderView extends View<ILoaderView> {
	protected _text: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);

		this._text = ensureElement('.loader__text', container);
	}

	set text(value: string) {
		this.setText(this._text, value);
	}
}
