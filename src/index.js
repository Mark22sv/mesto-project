const content = document.querySelector('.content');
const formEditProfile =content.querySelector('#form-edit-profile')
const nameInput = content.querySelector('#name');
const jobInput = content.querySelector('#about-me');
const profileName = content.querySelector('.profile__name');
const profileProfession = content.querySelector('.profile__profession');
const popupEditProfile = content.querySelector('.popup__edit-profile');
const profileEditButton = content.querySelector('.profile__edit-button');
const popupAddCard = content.querySelector('.popup__add-card');
const cardAddbutton = content.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const formAddCard = document.querySelector('#form-add-card');

export { nameInput, jobInput, profileName, profileProfession, popup };

import { initialCards } from './constant.js';
import { enableValidation } from './components/validate.js';
import { createCard, addCard, newCard } from './components/card.js';
import { submitAddCardsForm, submitEditProfileForm } from './components/modal.js';
import { openPopup, closePopup } from './components/utils.js';


// Вызов функции создания карточек

for (let i = 0; i < initialCards.length; i++){
  createCard(initialCards[i].name, initialCards[i].link);
  addCard(newCard);
}

// Установка слушателей

// Редактировать профиль
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Открыть (закрыть) popup редактирование профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupEditProfile);
});

// Открыть (закрыть) добавление карточки
cardAddbutton.addEventListener('click', () => {
  openPopup(popupAddCard);
});


// Карточки добавление
formAddCard.addEventListener('submit', submitAddCardsForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
});

popup.forEach(element => element.addEventListener('click', evt => {
  (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) ? closePopup() : null;
  })
);

enableValidation({
  formSelector: '.popup__data',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
});
