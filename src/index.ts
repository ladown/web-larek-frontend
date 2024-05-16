import './scss/styles.scss';

// imports
// types import
import { ICatalog, ICardModel } from './types';

// base import
import { EventEmitter } from './components/base/EventEmitter';

// model import
import { CatalogModel } from './components/model/CatalogModel';
import { CardModel } from './components/model/CardModel';
import { BasketModel } from './components/model/BasketModel';

// view import
import { CatalogView } from './components/view/CatalogView';
import { CardCatalogView, CardPreviewView, CardBasketView } from './components/view/CardView';
import { BasketView } from './components/view/BasketView';
import { ModalView } from './components/view/ModalView';
import { NotifyView } from './components/view/NotifyView';
import { LoaderView } from './components/view/LoaderView';

// presenter import

// common import
import { WebLarekAPI } from './components/common/WebLarekAPI';
import { Page } from './components/common/Page';

// other import
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';

// declarations
// templates declaration
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const emptyTemplate = ensureElement<HTMLTemplateElement>('#empty');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const loaderTemplate = ensureElement<HTMLTemplateElement>('#loader');
const errorTemplate = ensureElement<HTMLTemplateElement>('#error');
const deleteConfirmTemplate = ensureElement<HTMLTemplateElement>('#delete-confirm');

// global declaration
const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);
const page = new Page(document.body, events);

// model declaration
const catalogModel = new CatalogModel({}, events);
const basketModel = new BasketModel({}, events);

// view declaration
const catalogView = new CatalogView(document.body);
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
const loaderView = new LoaderView(cloneTemplate(loaderTemplate));

// api functions
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
						getProducts();
					},
				}).render({
					text: err,
				}),
			});
		});
};

// events

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

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

getProducts();

// @ts-ignore
