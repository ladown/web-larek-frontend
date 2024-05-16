import { View } from '../base/View';
import { ICatalogView } from '../../types/';
import { ensureElement } from '../../utils/utils';

export class CatalogView extends View<ICatalogView> {
	protected _content: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);

		this._content = ensureElement('.gallery');
	}

	set content(data: HTMLElement | HTMLElement[]) {
		this._content.replaceChildren(...(Array.isArray(data) ? data : [data]));
	}
}
