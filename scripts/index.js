//DOM узлы
const content = document.querySelector('.content');
const addButton = content.querySelector('.profile__add-button');
const places = content.querySelector('.places');
const placesList = places.querySelector('.places__list');

//Функция создания карточки
function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const deleteBtn = cardElement.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', function(evt) {
    deleteCard(evt.target.parentElement);
  });

  cardElement.querySelector('.card__image').setAttribute('src', link);
  cardElement.querySelector('.card__title').textContent = name;

  placesList.append(cardElement);
}

function deleteCard(card) {
  placesList.removeChild(card);
}

//Вывести карточки на страницу
initialCards.forEach((card) => addCard(card.name, card.link));