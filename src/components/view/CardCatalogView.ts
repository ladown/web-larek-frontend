import { TCardCatalogView, ICardViewActions } from '../../types/';
import { CardView } from './CardView';

export class CardCatalogView extends CardView<TCardCatalogView> {
	constructor(container: HTMLButtonElement, actions?: ICardViewActions) {
		super(container, actions);
	}
}
