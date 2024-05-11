import { IEventEmitter } from '../base/EventEmitter';
import { Presenter } from '../base/Presenter';
import { OrderModel } from '../model/OrderModel';
import { OrderView } from '../view/OrderView';
import { ensureElement, cloneTemplate } from '../../utils/utils';

const orderTemplate = ensureElement<HTMLTemplateElement>('#order');

export class OrderPresenter extends Presenter<OrderModel, OrderView> {
	constructor(events: IEventEmitter) {
		super(events, new OrderModel({}, events), new OrderView(cloneTemplate(orderTemplate)));
	}
}
