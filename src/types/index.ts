export type TEventName = string | RegExp;
// eslint-disable-next-line @typescript-eslint/ban-types
export type TSubscriber = Function;
export type TEmitterEvent = {
	eventName: string;
	data: unknown;
};

export interface IEventEmitter {
	on<T extends object>(event: TEventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export interface ICardModel {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: string | number | null;
	categoryModifier: string;
	buttonState: boolean;
}

export type TCard = Pick<ICardModel, 'id' | 'description' | 'image' | 'title' | 'category' | 'price'>;

export type TCardCatalogView = Pick<TCard, 'id' | 'category' | 'title' | 'image' | 'price'> & { categoryModifier: string };

export type TCardPreviewView = ICardModel & { categoryModifier: string; buttonState: boolean };

export type TCardBasketView = Pick<ICardModel, 'title' | 'price'> & { label: number };

export interface ICardViewActions {
	onClick?: () => void;
}

export interface ICatalog {
	total: number;
	items: TCard[];
}

export type TOrderModel = IOrderFields & Pick<IBasketModel<string>, 'total' | 'items'>;

export interface IOrderResult {
	id: string;
	total: number;
}

export interface ICommonErrorResponse {
	error: string;
}

export interface IBasketModel<T> {
	count: number;
	items: T[];
	total: number;
}

export type TOrderSteps = 'details' | 'order';
export type TOrderStepsFields = Array<Partial<keyof IOrderFields>>;
export type TOrderFields = Record<TOrderSteps, Partial<IOrderFields>>;

export interface IOrderFields {
	payment: string;
	email: string;
	phone: string;
	address: string;
}

export interface IOrderFormErrors {
	step: TOrderSteps;
	fields: Partial<IOrderFields>;
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

export type TFormErrors = Partial<Record<keyof IOrderFields, string>>;

export interface ILoaderView {
	text: string;
}

export interface INotifyView {
	text: string;
}

export interface INotifyViewActions {
	onClick?: () => void;
	onClickConfirm?: () => void;
}

export type TOrderRequest = IOrderFields & Pick<IBasketModel<string>, 'items' | 'total'>;

export interface IWebLarekAPI {
	getProducts(): Promise<ICatalog>;
	getProduct(id: string): Promise<TCard>;
	postOrder(order: TOrderRequest): Promise<IOrderResult>;
}

export interface IModalView {
	content: HTMLElement | null;
}
