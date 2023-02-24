const formAddCard = document.querySelector('#form-add-card');
const titleInput = formAddCard.querySelector('#title');
const linkInput = formAddCard.querySelector('#link');
const popupImage = document.querySelector('.popup__image');
const popupImagePhoto = document.querySelector('.popup__photo');
const popupImageTitle = document.querySelector('.popup__title');

import { openPopup, closePopup } from "./utils.js";
import { profileName, profileProfession, nameInput, jobInput } from "../index.js";
import { createCard, addCard, newCard } from './card.js';

// Функция открытия popup-image

function openPopupImage(linkName, titleName) {
  popupImagePhoto.src = linkName;
  popupImagePhoto.alt = titleName;
  popupImageTitle.textContent = titleName;
  openPopup(popupImage);
}

// Функция получения данных пользователя

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup();
}



// Функция получение данных карточки

function submitAddCardsForm(evt) {
  evt.preventDefault();
  const titleName = titleInput.value;
  const linkName = linkInput.value;
  closePopup();
  createCard (titleName, linkName);
  addCard(newCard);
  titleInput.value = titleInput.ariaPlaceholder;
  linkInput.value = linkInput.ariaPlaceholder;
}


export { openPopupImage, submitAddCardsForm, submitEditProfileForm };
