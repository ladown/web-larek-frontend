import { TCardPreviewView, ICardViewActions } from '../../types/';
import { ensureElement } from '../../utils/utils';
import { CardView } from './CardView';

export class CardPreviewView extends CardView<TCardPreviewView> {
	protected _description: HTMLParagraphElement;

	constructor(container: HTMLElement, actions?: ICardViewActions) {
		super(container, actions);

		this._description = ensureElement<HTMLParagraphElement>('.card__text', container);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set buttonState(value: boolean) {
		this.setDisabled(this._button, value);
		this.setText(this._button, value ? 'Уже в корзине' : 'В корзину');
	}
}
