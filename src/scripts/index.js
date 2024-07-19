import "../pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteCard, сlickOnLike } from "./components/cards.js";
import { initialCards, validationSettings } from "./components/initialData.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import { crudAPI } from "./components/api.js";

const placesList = document.querySelector(".places__list");
const content = document.querySelector(".content");

const editForm = document.querySelector(".popup_type_edit .popup__form");
const addForm = document.querySelector(".popup_type_new-card  .popup__form");
const avatarForm = document.querySelector(".popup_type_avatar  .popup__form");

const title = content.querySelector(".profile__title");
const description = content.querySelector(".profile__description");
const profileImage = content.querySelector(".profile__image");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const avatarInput = document.querySelector(".popup__input_type_avatar");

const popupTypeNew = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");

const modalImage = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__caption");

const spinner = document.querySelector(".spinner");

const handleError = (err) => {
  console.log(err);
};

const clickFunctions = {
  trash: deleteCard,
  like: сlickOnLike,
  card: openImage,
};

let profileId = undefined;

addButton.addEventListener("click", () => {
  clearValidation(addForm, validationSettings);
  openModal(popupTypeNew);
});

editButton.addEventListener("click", () => {
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
  clearValidation(editForm, validationSettings);
  openModal(popupTypeEdit);
});

avatarButton.addEventListener("click", () => {
  clearValidation(avatarForm, validationSettings);
  openModal(popupTypeAvatar);
});

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const btn = addForm.querySelector(".popup__button");

  renderLoading(true, btn, "Сохраняю...");

  crudAPI
    .addCard(cardNameInput.value, urlInput.value)
    .then((card) => {
      const newCard = createCard(card, clickFunctions, crudAPI, profileId);
      closeModal(evt, popupTypeNew, true);
      placesList.prepend(newCard);

      addForm.reset();
      clearValidation(addForm, validationSettings);
    })
    .catch(handleError)
    .finally(renderLoading(false, btn, "Сохранить"));
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const btn = editForm.querySelector(".popup__button");

  renderLoading(true, btn, "Сохраняю...");

  crudAPI
    .patchProfile(nameInput.value, jobInput.value)
    .then((profileData) => {
      updateProfile(profileData);
      closeModal(evt, popupTypeEdit, true);
      clearValidation(editForm, validationSettings);
    })
    .catch(handleError)
    .finally(renderLoading(false, btn, "Сохранить"));
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const btn = avatarForm.querySelector(".popup__button");

  renderLoading(true, btn, "Сохраняю...");

  crudAPI
    .patchAvatar(avatarInput.value)
    .then((profileData) => {
      profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
      closeModal(evt, popupTypeAvatar, true);
      clearValidation(avatarForm, validationSettings);

      avatarForm.reset();
    })
    .catch(handleError)
    .finally(renderLoading(false, btn, "Сохранить"));
}

addForm.addEventListener("submit", handleNewCardFormSubmit);
editForm.addEventListener("submit", handleEditProfileFormSubmit);
avatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

function openImage(name, link) {
  modalImage.src = link;
  modalImage.alt = "На фото " + name;
  modalCaption.textContent = name;
  openModal(popupTypeImage);
}

function addEventListenerForPopup(popup) {
  const popupCloseButton = popup.querySelector(".popup__close");

  popupCloseButton.addEventListener("click", (event) => {
    closeModal(event, popup);
  });

  popup.addEventListener("click", (event) => {
    closeModal(event, popup);
  });
}

document
  .querySelectorAll(".popup")
  .forEach((popup) => addEventListenerForPopup(popup));

function updateProfile(profileData) {
  profileId = profileData._id;
  title.textContent = profileData.name;
  description.textContent = profileData.about;
  profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
}

enableValidation(validationSettings);

Promise.all([crudAPI.getProfile(), crudAPI.getCards()])
  .then(([profile, cards]) => {
    updateProfile(profile);

    cards.forEach((card) => {
      const newCard = createCard(card, clickFunctions, crudAPI, profileId);
      placesList.append(newCard);
    });
  })
  .catch(handleError);

function renderLoading(isLoading, btn, btnText) {
  btn.textContent = btnText;
  if (isLoading) {
    spinner.classList.add("spinner_visible");
  } else {
    spinner.classList.remove("spinner_visible");
  }
}
