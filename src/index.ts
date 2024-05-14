import './scss/styles.scss';

// imports
// types import
import { ICatalog } from './types';

// base import
import { EventEmitter } from './components/base/EventEmitter';

// model import
import { CardModel } from './components/model/CardModel';
import { BasketModel } from './components/model/BasketModel';

// view import
import { BasketView } from './components/view/BasketView';
import { ModalView } from './components/view/ModalView';

// presenter import

// common import
import { WebLarekAPI } from './components/common/WebLarekAPI';

// other import
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';

// declarations
// templates declaration
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// global declaration
const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);

// model declaration
// const basketModel = new BasketModel({}, events);

// view declaration
const modalView = new ModalView(ensureElement<HTMLElement>('#modal-container'), events);

// presenter declaration

// @ts-ignore
