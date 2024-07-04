const cardTemplate = document.querySelector('#card-template').content;

function createCard(name, link, clickOnTrashIcon, сlickOnLike, clickOnCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const deleteBtn = cardElement.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', (event) => {
    clickOnTrashIcon(event);
  });

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardElement.querySelector('.card__title').textContent = name;

  cardImage.addEventListener('click', () => {
    clickOnCard(name, link);
  });

  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.addEventListener('click', (event) => {
    сlickOnLike(event);
  });

  return cardElement;
};

function deleteCard(event) {
  let card = event.target.closest('.card');
  card.parentElement.removeChild(card);
};

function сlickOnLike(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, сlickOnLike}