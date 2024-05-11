import { View } from '../base/View';
import { ILoaderView } from '../../types/';

export class Loader extends View<ILoaderView> {
	constructor(container: HTMLElement) {
		super(container);
	}
}
