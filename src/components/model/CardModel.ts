import { Model } from '../base/Model';
import { ICardModel } from '../../types';
import { formatNumber } from '../../utils/utils';

export class CardModel extends Model<ICardModel> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: string | number | null;
	isInBasket = false;

	get categoryModifier(): string {
		switch (this.category.toLowerCase()) {
			case 'софт-скил':
				return 'soft';
			case 'хард-скил':
				return 'hard';
			case 'дополнительное':
				return 'additional';
			case 'кнопка':
				return 'button';
			default:
				return 'other';
		}
	}

	get formattedPrice(): string {
		if (this.price && typeof this.price === 'number') {
			return `${formatNumber(this.price)} синапсов`;
		} else {
			return 'Бесценно';
		}
	}
}
