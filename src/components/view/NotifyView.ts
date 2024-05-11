import { View } from '../base/View';
import { INotifyView } from '../../types/';

export class NotifyView extends View<INotifyView> {
	constructor(container: HTMLElement) {
		super(container);
	}
}
