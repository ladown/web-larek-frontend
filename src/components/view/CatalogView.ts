import { View } from '../base/View';
import { ICatalogView } from '../../types/';
import { ensureElement } from '../../utils/utils';

export class CatalogView extends View<ICatalogView> {
	protected _content: HTMLElement;
	protected emptyState: HTMLElement;

	constructor(container: HTMLElement, emptyState: HTMLElement) {
		super(container);

		this.emptyState = emptyState;

		this._content = ensureElement('.gallery');
	}

	set content(data: HTMLElement | HTMLElement[]) {
		const _data = Array.isArray(data) ? data : [data];

		if (_data?.length) {
			this._content.replaceChildren(..._data);
		} else {
			this._content.replaceChildren(this.emptyState);
		}
	}
}
