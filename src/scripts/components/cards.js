const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, clickFunctions, cardAPI, profileId) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  adjustDeleteAction(
    cardElement,
    cardData,
    clickFunctions.trash,
    cardAPI.deleteCard,
    profileId
  );
  adjustCardImage(cardElement, cardData, clickFunctions.card);
  adjustLikeAction(
    cardElement,
    cardData,
    clickFunctions.like,
    cardAPI.likeCard,
    profileId
  );

  return cardElement;
}

function adjustDeleteAction(
  cardElement,
  cardData,
  trashCallback,
  deleteCardAPI,
  profileId
) {
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  if (profileId === cardData.owner._id) {
    deleteBtn.addEventListener("click", (event) => {
      trashCallback(event, cardData, deleteCardAPI);
    });
  } else {
    deleteBtn.classList.add("card__delete-button_hidden");
  }
}

function adjustCardImage(cardElement, cardData, onClickCallback) {
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", cardData.link);
  cardImage.setAttribute("alt", cardData.name);
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardImage.addEventListener("click", () => {
    onClickCallback(cardData.name, cardData.link);
  });
}

function adjustLikeAction(
  cardElement,
  cardData,
  callbackOnLike,
  saveLikeCard,
  profileId
) {
  const likeElement = cardElement.querySelector(".card__like");

  const likeBtn = likeElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", (event) => {
    callbackOnLike(event, cardData, saveLikeCard);
  });

  const likeNumber = likeElement.querySelector(".card__like-number");
  likeNumber.textContent = cardData.likes.length;

  cardData.likes.forEach((like) => {
    if (profileId === like._id) {
      likeBtn.classList.toggle("card__like-button_is-active");
    }
  });
}

function deleteCard(event, cardData, deleteCardAPI) {
  deleteCardAPI(cardData._id)
    .then(() => {
      const card = event.target.closest(".card");
      card.parentElement.removeChild(card);
    })
    .catch((err) => console.log(err));
}

function сlickOnLike(event, card, saveLikeCard) {
  saveLikeCard(
    card._id,
    !event.target.classList.contains("card__like-button_is-active")
  )
    .then((result) => {
      event.target.classList.toggle("card__like-button_is-active");
      const likeElement = event.target.closest(".card__like");
      const likeNumber = likeElement.querySelector(".card__like-number");
      likeNumber.textContent = result.likes.length;
    })
    .catch((err) => console.log(err));
}

export { createCard, deleteCard, сlickOnLike };
