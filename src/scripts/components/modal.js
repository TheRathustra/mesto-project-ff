function openModal(popup) {
  openPopup(popup);
  //Повесим на весь документ для нажатия клавиши Esc
  document.addEventListener("keydown", closeModal);
}

function closeModal(event, popup, close = false) {
  if (!popup && event.key === "Escape") {
    popup = document.querySelector(".popup_is-opened");
  }

  if (!popup) {
    return false;
  }

  const popupCloseButton = popup.querySelector(".popup__close");
  if (
    event.key === "Escape" ||
    event.target === popupCloseButton ||
    !event.target.closest(".popup__content") ||
    close
  ) {
    closePopup(popup);
    document.removeEventListener("keydown", closeModal);

    return true;
  }

  return false;
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

export { openModal, closeModal };
