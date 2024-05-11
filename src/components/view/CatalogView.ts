import { View } from '../base/View';
import { ICatalogModel } from '../../types/';
// import { ensureElement } from '../../utils/utils';

export class CatalogView extends View<ICatalogModel> {
	constructor(container: HTMLElement) {
		super(container);
	}
}
