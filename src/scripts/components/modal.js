const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');

//Повесим на весь документ для нажатия клавиши Esc
document.addEventListener('keydown', closeModal); 

function openModal(popup) {
  openPopup(popup);
  addEventListenerForPopup(popup);
}

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

function closeModal(event, popup, close = false) {
 
  if (!popup && event.key === 'Escape') {
    popup = document.querySelector('.popup_is-opened');
  }

  if (!popup) {
    return;
  }

  const popupCloseButton = popup.querySelector('.popup__close');
  if (event.key === 'Escape' || event.target === popupCloseButton || !event.target.closest('.popup__content') || close) {
    closePopup(popup);
  }
}

function openImage(name, link) {
  modalImage.src = link;
  modalImage.alt = 'На фото ' + name;
  modalCaption.textContent = name;
  openPopup(popupImage);
  addEventListenerForPopup(popupImage);
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

export {openModal, closeModal, openImage}