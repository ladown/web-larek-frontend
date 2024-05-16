export interface ICardModel {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: string | number | null;
	categoryModifier?: string;
	buttonState: boolean;
}

export interface ICardBasketView {
	label: number;
	title: string;
	price: string;
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

export interface IBasketView {
	count: number;
	items: HTMLElement[];
	total: number;
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

export interface ICatalogView {
	content: HTMLElement | HTMLElement[];
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
}

export interface INotifyViewActions {
	onClick?: () => void;
}

export type TOrderRequest = IOrderFields & Pick<IBasketModel, 'items' | 'total'>;

export interface IWebLarekAPI {
	getProducts(): Promise<ICatalog>;
	getProduct(id: string): Promise<ICardModel>;
	postOrder(order: TOrderRequest): Promise<IOrderResult>;
}
