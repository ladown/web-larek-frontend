import { IEventEmitter } from '../base/EventEmitter';
import { Presenter } from '../base/Presenter';
import { CatalogModel } from '../model/CatalogModel';
import { CatalogView } from '../view/CatalogView';

export class CatalogPresenter extends Presenter<CatalogModel, CatalogView> {
	constructor(events: IEventEmitter) {
		super(events, new CatalogModel({}, events), new CatalogView(document.querySelector('.gallery') as HTMLElement));
	}
}
