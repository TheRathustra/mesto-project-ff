import '../pages/index.css';
import {openModal, closeModal} from './components/modal.js' 
import {createCard, deleteCard, ClickOnLike} from './components/cards.js'
import {initialCards} from './components/initialData.js'

const placesList = document.querySelector('.places__list');
const content = document.querySelector('.content');
const editForm = document.querySelector('.popup_type_edit .popup__form');
const addForm = document.querySelector('.popup_type_new-card  .popup__form');

const title = content.querySelector('.profile__title');
const description = content.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

initialCards.forEach((card) => {
  const link = new URL(card.link, import.meta.url);
  card = createCard(card.name, link, placesList, deleteCard, ClickOnLike);
  placesList.append(card);
});
 
addButton.addEventListener('click', () => {
  openModal(document.querySelector('.popup_type_new-card'));
});

editButton.addEventListener('click', () => {
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
  openModal(document.querySelector('.popup_type_edit'));
});

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard(cardNameInput.value, urlInput.value, placesList, deleteCard, ClickOnLike);
  closeModal(evt, evt.target.closest('.popup'), true);
  placesList.prepend(newCard);
  addForm.reset();
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const title = content.querySelector('.profile__title');
  const description = content.querySelector('.profile__description');
  
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;

  closeModal(evt, evt.target.closest('.popup'), true);
}

addForm.addEventListener('submit', handleNewCardFormSubmit);
editForm.addEventListener('submit', handleFormSubmit);