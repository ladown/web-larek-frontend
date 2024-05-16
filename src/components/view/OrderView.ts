import { View } from '../base/View';
import { IEventEmitter, IOrderFields } from '../../types';
import { ensureAllElements, ensureElement } from '../../utils/utils';

export class OrderView extends View<HTMLFormElement, HTMLFormElement> {
	protected _buttons: HTMLButtonElement[] | null;
	protected _inputs: HTMLInputElement[];
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLSpanElement;
	buttonModifier: string;

	constructor(
		container: HTMLFormElement,
		protected events: IEventEmitter,
	) {
		super(container);

		this._buttons = Array.from(container.querySelectorAll('.order__buttons button') || []);
		this._inputs = ensureAllElements<HTMLInputElement>('.form__input', container);
		this._submit = ensureElement<HTMLButtonElement>('.button[type="submit"]', container);
		this._errors = ensureElement<HTMLSpanElement>('.form__errors', container);

		this.buttonModifier = 'button_alt-active';

		this._buttons.forEach((button) => {
			button.addEventListener('click', () => {
				this._buttons.forEach((el) =>
					this.toggleClass(el, this.buttonModifier, !button.classList.contains(this.buttonModifier) && button === el),
				);

				if (button.classList.contains(this.buttonModifier)) {
					const value = button.name;

					this.onFieldChange(button, 'payment', value);
				} else {
					this.onFieldChange(button, 'payment', '');
				}
			});
		});

		this._inputs.forEach((input) => {
			input.addEventListener('input', (event: InputEvent) => {
				const target = event.target as HTMLInputElement;
				const field = target.name as keyof IOrderFields;
				const value = target.value;

				this.onFieldChange(target, field, value);
			});
		});

		this.container.addEventListener('submit', (event) => {
			event.preventDefault();

			const target = event.target as HTMLFormElement;
			const formName = target.name;

			this.events.emit(`order:${formName}-submit`);
		});
	}

	protected onFieldChange(target: HTMLInputElement | HTMLButtonElement, field: keyof IOrderFields, value: string) {
		this.events.emit(`order:field-change`, {
			target,
			field,
			value,
		});
	}

	set errors(value: string) {
		this.setInnerHTML(this._errors, value);
	}

	set valid(value: boolean) {
		this._submit.disabled = value;
	}
}
