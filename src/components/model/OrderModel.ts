import { Model } from '../base/Model.ts';
import { IOrderModel, TFormErrors, IOrderFields, TOrderPayment, IEventEmitter } from '../../types/';

export class OrderModel extends Model<IOrderModel> {
	protected _fields: IOrderFields;
	formErrors: TFormErrors = {};

	constructor(data: Partial<IOrderModel>, events: IEventEmitter) {
		super(data, events);

		this._fields = this.getResetFields();
	}

	get fields(): IOrderFields {
		return this._fields;
	}

	setFieldValue(field: keyof IOrderFields, value: TOrderPayment | string, target?: HTMLInputElement) {
		if (field === 'payment') {
			this._fields[field] = value as TOrderPayment;
		} else {
			this._fields[field] = value;
		}

		if (target) {
			this.validateFields(target, field);
		}
	}

	getResetFields(): IOrderFields {
		return {
			payment: 'online',
			email: '',
			phone: '',
			address: '',
		};
	}

	validateFields(target: HTMLInputElement, field: keyof IOrderFields): boolean {
		const errors: typeof this.formErrors = {};

		if (!target.checkValidity()) {
			errors[field] = target.validationMessage;
		}

		Object.keys(this._fields).forEach((key) => {
			if (!errors[key] && !this._fields[key]) {
				errors[key] = `Необходимо указать поле ${key}`;
			}
		});

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}
}
