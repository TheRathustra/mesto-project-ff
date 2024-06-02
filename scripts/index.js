//DOM узлы
const content = document.querySelector('.content');
const sectionPlaces = content.querySelector('.places');
const placesList = sectionPlaces.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

//Функция создания карточки
function createCard(name, link, clickOnTrashIcon) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const deleteBtn = cardElement.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', function() {
    clickOnTrashIcon(cardElement);
  });

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardElement.querySelector('.card__title').textContent = name;

  return cardElement;
}

function deleteCard(card) {
  placesList.removeChild(card);
}

//Вывести карточки на страницу
initialCards.forEach((card) => {
  card = createCard(card.name, card.link, deleteCard);
  placesList.append(card);
});