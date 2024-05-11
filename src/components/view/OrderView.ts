import { View } from '../base/View';
import { IOrderModel } from '../../types';
// import { ensureElement } from '../../utils/utils';

export class OrderView extends View<IOrderModel> {
	constructor(container: HTMLElement) {
		super(container);
	}
}
