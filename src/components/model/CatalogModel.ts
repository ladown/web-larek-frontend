import { Model } from '../base/Model';
import { ICatalogModel, ICardModel } from '../../types/';

export class CatalogModel extends Model<ICatalogModel> {
	protected _cards: ICardModel[];

	get cards(): ICardModel[] {
		return this._cards;
	}

	set cards(value: ICardModel[]) {
		this._cards = value;
	}
}
