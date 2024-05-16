import { Model } from '../base/Model';
import { TOrderSteps, TOrderStepsFields, TOrderFields, IOrderModel, TFormErrors, IOrderFields } from '../../types/';

export class OrderModel extends Model<IOrderModel> {
	protected fields: TOrderFields = this.getResetFields();
	formErrors: TFormErrors = {};
	steps: Record<TOrderSteps, TOrderStepsFields> = {
		details: ['payment', 'address'],
		order: ['email', 'phone'],
	};
	fieldsKeyMapper: Record<keyof IOrderFields, string> = {
		payment: 'Способ оплаты',
		email: 'Email',
		phone: 'Телефон',
		address: 'Адрес доставки',
	};

	getStepKey(field: keyof IOrderFields): TOrderSteps | '' {
		return Object.entries(this.fields).reduce((acc: TOrderSteps, [key, value]: [TOrderSteps, Partial<IOrderFields>]) => {
			return field in value ? (acc = key) : acc;
		}, '');
	}

	setFieldValue(field: keyof IOrderFields, value: string, target?: HTMLInputElement | HTMLButtonElement) {
		const step: TOrderSteps | '' = this.getStepKey(field);

		if (step) {
			this.fields[step][field] = value;
			this.validateFields(field, step, target);
		}
	}

	getResetFields(): TOrderFields {
		return {
			details: {
				payment: '',
				address: '',
			},
			order: {
				email: '',
				phone: '',
			},
		};
	}

	validateFields(field: keyof IOrderFields, step: TOrderSteps, target: HTMLInputElement | HTMLButtonElement) {
		const errors: TFormErrors = {};

		if (!target.checkValidity()) {
			errors[field] = target.validationMessage;
		}

		Object.keys(this.fields[step]).forEach((key: keyof IOrderFields) => {
			if (!errors[key] && !this.fields[step][key]) {
				errors[key] = `Необходимо указать поле "${this.fieldsKeyMapper[key]}"`;
			}
		});

		this.formErrors = errors;
		this.events.emit('order:errors-change', { step, fields: this.formErrors });
	}

	getFields(): Partial<IOrderFields> {
		return Object.values(this.fields).reduce((acc, val) => ({ ...acc, ...val }), {});
	}

	resetState() {
		this.fields = this.getResetFields();
		this.formErrors = {};
	}
}
