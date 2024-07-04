import '../pages/index.css';
import {openModal, closeModal} from './components/modal.js' 
import {createCard, deleteCard, сlickOnLike} from './components/cards.js'
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

const popupTypeNew = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');

const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

addButton.addEventListener('click', () => {
  openModal(popupTypeNew);
});

editButton.addEventListener('click', () => {
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
  openModal(popupTypeEdit);
});

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard(cardNameInput.value, urlInput.value, deleteCard, сlickOnLike, openImage);
  closeModal(evt, popupTypeNew, true);
  placesList.prepend(newCard);
  addForm.reset();
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;

  closeModal(evt, popupTypeEdit, true);
}

addForm.addEventListener('submit', handleNewCardFormSubmit);
editForm.addEventListener('submit', handleEditProfileFormSubmit);

function openImage(name, link) {
  modalImage.src = link;
  modalImage.alt = 'На фото ' + name;
  modalCaption.textContent = name;
  openModal(popupTypeImage);
}

initialCards.forEach((card) => {
  const link = new URL(card.link, import.meta.url);
  card = createCard(card.name, link, deleteCard, сlickOnLike, openImage);
  placesList.append(card);
});

function addEventListenerForPopup(popup) {
  //Получили кнопку текущего "крестика" и добавили слушателя
  const popupCloseButton = popup.querySelector('.popup__close');
  
  popupCloseButton.addEventListener('click', (event) => {
    closeModal(event, popup);
  });

  popup.addEventListener('click', (event) => {
    closeModal(event, popup);
  });
}

addEventListenerForPopup(popupTypeNew);
addEventListenerForPopup(popupTypeEdit);
addEventListenerForPopup(popupTypeImage);