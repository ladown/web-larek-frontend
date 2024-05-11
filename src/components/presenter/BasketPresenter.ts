import { IEventEmitter } from '../base/EventEmitter';
import { Presenter } from '../base/Presenter';
import { BasketModel } from '../model/BasketModel';
import { BasketView } from '../view/BasketView';
import { ensureElement, cloneTemplate } from '../../utils/utils';

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

export class BasketPresenter extends Presenter<BasketModel, BasketView> {
	constructor(events: IEventEmitter) {
		super(events, new BasketModel({}, events), new BasketView(cloneTemplate(basketTemplate)));
	}
}
