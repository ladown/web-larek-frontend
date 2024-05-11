import { View } from '../base/View';
import { ICardModel } from '../../types/';
// import { ensureElement } from '../../utils/utils';

export class CardView extends View<ICardModel> {
	constructor(container: HTMLElement) {
		super(container);
	}
}
