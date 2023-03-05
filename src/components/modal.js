const formAddCard = document.forms['image-data'];
const titleInput = formAddCard.querySelector('#title');
const linkInput = formAddCard.querySelector('#link');
const linkAvatar = document.querySelector('#avatar-link')
const popupImage = document.querySelector('.popup__image');
const popupImagePhoto = document.querySelector('.popup__photo');
const popupImageTitle = document.querySelector('.popup__title');

import { openPopup, closePopup } from "./utils.js";
import { profileName, profileProfession, nameInput, jobInput, userId, profileAvatar } from "../index.js";
import { createCard, addCard } from './card.js';
import { changeDataUser, addNewCard, changeAvatar } from './api.js'


// Функция открытия popup-image

function openPopupImage(linkName, titleName) {
  popupImagePhoto.src = linkName;
  popupImagePhoto.alt = titleName;
  popupImageTitle.textContent = titleName;
  openPopup(popupImage);
}

//Изменение текста кнопки
function setTextButton(button, text) {
  button.textContent = text;
}

// Функция получения данных пользователя

function submitEditProfileForm(evt) {
  evt.preventDefault();
  setTextButton(evt.submitter, 'Сохранение ...');
  changeDataUser(nameInput.value, jobInput.value)
  .then((result) => {
    profileName.textContent = result.name;
    profileProfession.textContent = result.about;
    closePopup();
    evt.target.reset();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(()=> {
    setTextButton(evt.submitter, 'Сохранить')
  })
}

// Функция получение данных карточки

function submitAddCardsForm(evt) {
  evt.preventDefault();
  setTextButton(evt.submitter, 'Сохранение ...');
  addNewCard(titleInput.value, linkInput.value)
  .then((result) => {
    const titleName = result.name;
    const linkName = result.link;
    closePopup();
    const newCard = createCard (titleName, linkName, userId, [], result._id);
    addCard(newCard);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(()=> {
    setTextButton(evt.submitter, 'Сохранить')
  })
}

function submitChangeAvatar(evt) {
  evt.preventDefault();
  setTextButton(evt.submitter, 'Сохранение ...');
  changeAvatar(linkAvatar.value)
  .then((result) => {
    const linkAvatar = result.avatar;
    closePopup();
    profileAvatar.src = linkAvatar;
    evt.target.reset();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(()=> {
    setTextButton(evt.submitter, 'Сохранить')
  })
}


export { openPopupImage, submitAddCardsForm, submitEditProfileForm, submitChangeAvatar };
