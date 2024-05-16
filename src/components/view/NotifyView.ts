import { View } from '../base/View';
import { INotifyView, INotifyViewActions } from '../../types/';

export class NotifyView extends View<INotifyView> {
	protected _text: HTMLParagraphElement;
	protected _button: HTMLElement | null;

	constructor(container: HTMLElement, actions?: INotifyViewActions) {
		super(container);

		this._text = container.querySelector('.notify__description');
		this._button = container.querySelector('.button');

		if (this._button && actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set text(value: string) {
		if (value) {
			this.setVisible(this._text);
			this.setText(this._text, value);
		} else {
			this.setHidden(this._text);
		}
	}
}
