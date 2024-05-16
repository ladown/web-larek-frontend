import { Model } from '../base/Model';
import { CardModel } from './CardModel';
import { ICatalogModel, ICardModel } from '../../types/';

export class CatalogModel extends Model<ICatalogModel> {
	cards: CardModel[];

	setCards(data: ICardModel[]) {
		this.cards = data.map((card) => new CardModel(card, this.events));
		this.emitChanges('cards:change', { cards: this.cards });
	}
}
