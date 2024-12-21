import './scss/styles.scss';
import { EventEmitter } from './components/base/EventEmitter';
import { AppState } from './components/model/AppState';
import { larekApi } from './components/model/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { Card } from './components/view/Card';
import { cloneTemplate } from './utils/utils';

const successTemplate = document.querySelector('#success') as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;

const events = new EventEmitter();

const appState = new AppState({}, events);

const api = new larekApi(CDN_URL, API_URL);

api.getProducts()
.then(data => {
  appState.setItems(data);
  console.log(appState);
})
.catch(err => {
  console.error(err);
})

const listItems = document.querySelector('.gallery')
const card1 = new Card(cloneTemplate(cardPreviewTemplate))

card1.title = 'Product'
card1.description = '123123123123'
card1.button = 'Buy'
card1.price = '123';

listItems.append(card1.render())