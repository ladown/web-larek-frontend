import { View } from '../base/View';
import { IEventEmitter } from '../base/EventEmitter';
import { ensureElement } from '../../utils/utils';

interface IForm {
	valid: boolean;
	errors: string;
}

export class Form<T> extends View<IForm> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(
		protected container: HTMLFormElement,
		protected events: IEventEmitter,
	) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;

			this.onInputChange(target, field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(target: HTMLInputElement, field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			target,
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IForm) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
