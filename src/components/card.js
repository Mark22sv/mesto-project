const elementList = document.querySelector ('.elements__list');
const cardTemplate = document.querySelector('#cards').content;

import { openPopupImage } from "./modal.js";

// Функция создания карточки

function createCard (titleName, linkName) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementPhoto = cardElement.querySelector('.element__photo');
  elementPhoto.src = linkName;
  elementPhoto.alt = titleName;
  cardElement.querySelector('.element__title').textContent = titleName;
  cardElement.querySelector(".element__delete-icon").addEventListener('click', function (evt){
    const deleteButton = evt.target.closest('.element');
    deleteButton.remove();
  });
  cardElement.querySelector('.element__vector').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__vector_active');
  });

  elementPhoto.addEventListener('click', () => {
    openPopupImage(linkName, titleName);
  });
  return cardElement;
}

// Функция добавления карточки

function addCard(newCard) {
  elementList.prepend(newCard);
}

export { createCard, addCard };
