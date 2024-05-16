import { Api } from '../base/api';
import { TCard, ICatalog, IOrderResult, IWebLarekAPI, TOrderRequest } from '../../types/';

export class WebLarekAPI implements IWebLarekAPI {
	readonly cdn: string;
	readonly api: Api;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		this.api = new Api(baseUrl, options);
		this.cdn = cdn;
	}

	async getProducts(): Promise<ICatalog> {
		return this.api.get('/product/').then((data: ICatalog) => {
			return {
				...data,
				items: data.items.map((item) => {
					return {
						...item,
						image: `${this.cdn}${item.image}`,
					};
				}),
			};
		});
	}

	async getProduct(id: string): Promise<TCard> {
		return this.api.get(`/product/${id}`).then((data: TCard) => ({
			...data,
			image: `${this.cdn}${data.image}`,
		}));
	}

	async postOrder(order: TOrderRequest): Promise<IOrderResult> {
		return this.api.post('/order', order, 'POST').then((ctx: IOrderResult) => ctx);
	}
}
