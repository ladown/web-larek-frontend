import { View } from '../base/View';
import { INotifyView, INotifyViewActions } from '../../types/';

export class NotifyView extends View<INotifyView> {
	protected _text: HTMLParagraphElement;
	protected _buttonClose: HTMLElement | null;
	protected _buttonConfirm: HTMLElement | null;

	constructor(container: HTMLElement, actions?: INotifyViewActions) {
		super(container);

		this._text = container.querySelector('.notify__description');
		this._buttonClose = container.querySelector('.notify__close');
		this._buttonConfirm = container.querySelector('.notify__confirm');

		if (this._buttonClose && actions?.onClick) {
			this._buttonClose.addEventListener('click', actions.onClick);
		}

		if (this._buttonConfirm && actions?.onClickConfirm) {
			this._buttonConfirm.addEventListener('click', actions.onClickConfirm);
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
