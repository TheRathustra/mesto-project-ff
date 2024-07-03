import {openImage} from './modal.js'

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(name, link, Elements, clickOnTrashIcon, ClickOnLike) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const deleteBtn = cardElement.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', () => {
    clickOnTrashIcon(cardElement, Elements);
  });

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardElement.querySelector('.card__title').textContent = name;

  cardImage.addEventListener('click', () => {
    openImage(name, link);
  });

  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.addEventListener('click', (event) => {
    ClickOnLike(event);
  });

  return cardElement;
};

export function deleteCard(card, Elements) {
  Elements.removeChild(card);
};

export function ClickOnLike(event) {
  event.target.classList.toggle('card__like-button_is-active');
}