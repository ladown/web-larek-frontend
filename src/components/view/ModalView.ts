import { View } from '../base/View';
import { ensureElement } from '../../utils/utils';
import { IEventEmitter } from '../base/EventEmitter.js';

interface IModalView {
	content: HTMLElement | null;
}

export class ModalView extends View<IModalView> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(
		container: HTMLElement,
		protected events: IEventEmitter,
	) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement | string) {
		this._content.replaceChildren(value);
	}

	protected open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	protected close() {
		this.container.classList.remove('modal_active');
		this.content = '';
		this.events.emit('modal:close');
	}

	render(data: IModalView): HTMLElement {
		if (data.content) {
			super.render(data);
			this.open();
		} else {
			this.close();
		}

		return this.container;
	}
}
