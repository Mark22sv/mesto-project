const elementList = document.querySelector ('.elements__list');
const cardTemplate = document.querySelector('#cards').content;
const popupRemoveCard = document.querySelector('.popup__remove-card');
const buttonRemoveCard =  document.querySelector('#submit-remove-card');

import { openPopupImage } from "./modal.js";
import { userId  } from "../index.js";
import { removeCard, addLikeCard, removeLikeCard } from "./api.js";
import { openPopup, closePopup } from './utils.js';

// Функция создания карточки

function createCard (titleName, linkName, user, likes, cardId) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.dataset.owner = user;
  cardElement.dataset.card_id = cardId;
  const elementPhoto = cardElement.querySelector('.element__photo');
  elementPhoto.src = linkName;
  elementPhoto.alt = titleName;
  const elementLikes = cardElement.querySelector('.element__likes');
  elementLikes.textContent = likes.length;
  const elementVector = cardElement.querySelector('.element__vector');
  if (hasCardLikes(likes)) elementVector.classList.add('element__vector_active');
  cardElement.querySelector('.element__title').textContent = titleName;
  const deleteButton = cardElement.querySelector(".element__delete-icon");
  if (cardElement.dataset.owner == userId){
    deleteButton.classList.add('element__delete-icon_active');
    deleteButton.addEventListener('click', function (evt){
      openPopup(popupRemoveCard);
      buttonRemoveCard.addEventListener('click', () => {
        removeCard(cardElement.dataset.card_id)
        .then(() => {
          const deleteButton = evt.target.closest('.element');
          deleteButton.remove();
          closePopup();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      });
    });
  }
  elementVector.addEventListener('click', function (evt){
    if (!evt.target.classList.contains('element__vector_active')){
      addLikeCard(cardElement.dataset.card_id)
      .then((data) => {
        evt.target.classList.toggle('element__vector_active');
        elementLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    } else {
      removeLikeCard(cardElement.dataset.card_id)
      .then((data) => {
        evt.target.classList.toggle('element__vector_active');
        elementLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    }
  });
  elementPhoto.addEventListener('click', () => {
    openPopupImage(linkName, titleName);
  });
  return cardElement;
}

function hasCardLikes(card){
  let res;
  if (card.length > 0){
    card.forEach(element => {
      if (element._id == userId) res = true;
    })
  }
  return res;
}
// Функция добавления карточки

function addCard(newCard) {
  elementList.prepend(newCard);
}

export { createCard, addCard };
