export interface ICardModel {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface ICardViewActions {
	onClick?: () => void;
}

export interface ICatalog {
	total: number;
	items: ICardModel[];
}

export type TOrderPayment = 'online' | 'cash';

export type TOrderModel = IOrderFields & Pick<IBasketModel, 'total' | 'items'>;

export interface IOrderResult {
	id: string;
	total: number;
}

export interface ICommonErrorResponse {
	error: string;
}

export interface IBasketModel {
	count: number;
	items: string[];
	total: number;
}

export interface IOrderFields {
	payment: TOrderPayment;
	email: string;
	phone: string;
	address: string;
}

export interface IOrderModel {
	fieldsValue: IOrderFields;
}

export interface ICatalogModel {
	cards: ICardModel[];
}

export type TFormErrors = Partial<Record<keyof IOrderModel, string>>;

export interface ILoaderView {
	text: string;
}

export interface INotifyView {
	text: string;
	buttonModifier: string;
	buttonText: string;
}

export type TOrderRequest = IOrderFields & Pick<IBasketModel, 'items' | 'total'>;

export interface IWebLarekAPI {
	getProducts(): Promise<ICatalog>;
	getProduct(id: string): Promise<ICardModel>;
	postOrder(order: TOrderRequest): Promise<IOrderResult>;
}
