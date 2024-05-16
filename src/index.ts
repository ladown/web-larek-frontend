import './scss/styles.scss';

import { IOrderFields, IOrderFormErrors, TOrderRequest } from './types';

import { EventEmitter } from './components/base/EventEmitter';

import { CatalogModel } from './components/model/CatalogModel';
import { CardModel } from './components/model/CardModel';
import { BasketModel } from './components/model/BasketModel';
import { OrderModel } from './components/model/OrderModel';

import { CatalogView } from './components/view/CatalogView';
import { CardCatalogView } from './components/view/CardCatalogView';
import { CardPreviewView } from './components/view/CardPreviewView';
import { CardBasketView } from './components/view/CardBasketView';
import { BasketView } from './components/view/BasketView';
import { ModalView } from './components/view/ModalView';
import { NotifyView } from './components/view/NotifyView';
import { OrderView } from './components/view/OrderView';

import { WebLarekAPI } from './components/common/WebLarekAPI';
import { Page } from './components/common/Page';

import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, getObjectLength, ensureElement, formatNumber } from './utils/utils';

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const emptyTemplate = ensureElement<HTMLTemplateElement>('#empty');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const detailsTemplate = ensureElement<HTMLTemplateElement>('#details');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const loaderTemplate = ensureElement<HTMLTemplateElement>('#loader');
const errorTemplate = ensureElement<HTMLTemplateElement>('#error');
const deleteConfirmTemplate = ensureElement<HTMLTemplateElement>('#delete-confirm');

const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);
const page = new Page(document.body, events);

const catalogModel = new CatalogModel({}, events);
const basketModel = new BasketModel({}, events);
const orderModel = new OrderModel({}, events);

const catalogView = new CatalogView(
	document.body,
	new NotifyView(cloneTemplate(emptyTemplate)).render({
		buttonsVisible: false,
	}),
);
const modalView = new ModalView(ensureElement<HTMLElement>('#modal-container'), events);
const basketView = new BasketView(
	cloneTemplate(basketTemplate),
	events,
	new NotifyView(cloneTemplate(emptyTemplate), {
		onClick() {
			modalView.render({
				content: null,
			});
		},
	}).render(),
);
const loaderView = new NotifyView(cloneTemplate(loaderTemplate));
const successView = new NotifyView(cloneTemplate(successTemplate), {
	onClick() {
		modalView.render({
			content: null,
		});
	},
});

const orderViews = {
	details: new OrderView(cloneTemplate(detailsTemplate), events),
	order: new OrderView(cloneTemplate(orderTemplate), events),
};

const getProducts = () => {
	catalogView.render({
		content: loaderView.render(),
	});

	api.getProducts()
		.then((data) => {
			catalogModel.setCards(data.items);
		})
		.catch((err) => {
			catalogView.render({
				content: new NotifyView(cloneTemplate(errorTemplate), {
					onClick() {
						window.location.reload();
					},
				}).render({
					text: err,
					buttonText: 'Перезагрузить страницу',
				}),
			});
		});
};

const postOrder = () => {
	modalView.render({
		content: loaderView.render({
			text: 'Отправка формы...',
		}),
	});

	const orderData: TOrderRequest = {
		...orderModel.getFields(),
		total: basketModel.total,
		items: basketModel.items,
	};

	api.postOrder(orderData)
		.then(({ total }) => {
			basketModel.resetState();
			events.emit('basket:change');

			catalogModel.cards.forEach((card) => {
				card.isInBasket = false;
			});

			orderModel.resetState();

			events.emit('order:reset-view');

			modalView.render({
				content: successView.render({
					text: `Списано ${formatNumber(total)} синапсов`,
				}),
			});
		})
		.catch((err) => {
			modalView.render({
				content: new NotifyView(cloneTemplate(errorTemplate), {
					onClick() {
						postOrder();
					},
				}).render({
					text: err,
				}),
			});
		});
};

events.on('cards:change', (data: { cards: CardModel[] }) => {
	catalogView.render({
		content: data.cards.map((card) => {
			const cardCatalog = new CardCatalogView(cloneTemplate<HTMLButtonElement>(cardCatalogTemplate), {
				onClick() {
					events.emit('preview:change', card);
				},
			});

			return cardCatalog.render({
				id: card.id,
				category: card.category,
				title: card.title,
				image: card.image,
				price: card.formattedPrice,
				categoryModifier: card.categoryModifier,
			});
		}),
	});
});

events.on('preview:change', (preview: CardModel) => {
	modalView.render({
		content: new CardPreviewView(cloneTemplate(cardPreviewTemplate), {
			onClick() {
				(this as HTMLButtonElement).textContent = 'Уже в корзине';
				(this as HTMLButtonElement).disabled = true;

				basketModel.addCardToBasket(preview);
			},
		}).render({
			id: preview.id,
			category: preview.category,
			title: preview.title,
			description: preview.description,
			image: preview.image,
			price: preview.formattedPrice,
			categoryModifier: preview.categoryModifier,
			buttonState: preview.isInBasket,
		}),
	});
});

events.on('basket:open', () => {
	modalView.render({
		content: basketView.render(),
	});
});

events.on('basket:change', () => {
	basketView.render({
		count: basketModel.count,
		total: basketModel.total,
		items: basketModel.items.map((id, index) => {
			const data = catalogModel.cards.find((cardItem) => cardItem.id === id);
			const cardBasket = new CardBasketView(cloneTemplate(cardBasketTemplate), {
				onClick() {
					modalView.render({
						content: new NotifyView(cloneTemplate(deleteConfirmTemplate), {
							onClick() {
								events.emit('basket:open');
							},
							onClickConfirm() {
								basketModel.removeCardFromBasket(data);
								events.emit('basket:open');
							},
						}).render(),
					});
				},
			});
			return cardBasket.render({
				label: index + 1,
				title: data.title,
				price: data.formattedPrice,
			});
		}),
	});
});

events.on('order:open-step-details', () => {
	modalView.render({
		content: orderViews.details.render(),
	});
});

events.on('order:open-step-order', () => {
	modalView.render({
		content: orderViews.order.render(),
	});
});

events.on(
	'order:field-change',
	(data: { target: HTMLInputElement | HTMLButtonElement; field: keyof IOrderFields; value: string }) => {
		orderModel.setFieldValue(data.field, data.value, data.target);
	},
);

events.on('order:errors-change', ({ step, fields }: IOrderFormErrors) => {
	orderViews[step].valid = !getObjectLength(fields);
	orderViews[step].errors = Object.values(fields)
		.filter((field) => !!field)
		.join('<br/>');
});

events.on('order:details-submit', () => {
	events.emit('order:open-step-order');
});

events.on('order:order-submit', () => {
	postOrder();
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

getProducts();
