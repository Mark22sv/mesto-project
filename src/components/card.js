import { idUser } from './index.js';

export default class Card {
  constructor(cardData, handLikeClick, { popupWithConfirmDeletion }, openPopupImage, selector) {
    this._selector = selector;
    this._cardImg = cardData.link;
    this._cardTitle = cardData.name;
    this._likeRate = cardData.likes.length;
    this._likes = cardData.likes;
    this._idOwner = cardData.owner._id;
    this._idCard = cardData._id;
    this._handLikeClick = handLikeClick;
    this._popupWithConfirmDeletion = popupWithConfirmDeletion;
    this._openPopupImage = openPopupImage;
  }

  generate() {
    this._element = this._getElement();
    this._elementCardImg = this._element.querySelector('.card__img');
    this._elementCardTitle = this._element.querySelector('.card__title');
    this._elementCardLikeRate = this._element.querySelector('.card__like-rate');
    this._elementBtnLikeCard = this._element.querySelector('.btn_type_like');
    this._elementBtnDelCard =  this._element.querySelector('.btn_type_del');

    this._setEventListeners();

    this._elementCardImg.src = this._cardImg;
    this._elementCardImg.alt = this._cardImg;
    this._elementCardTitle.textContent = this._cardTitle;
    this._elementCardLikeRate.textContent = this._likeRate;

    if (-1 !== this._likes.findIndex(element => element._id === idUser)) {
      this._elementBtnLikeCard.classList.add('btn_liked');
    };

    return this._element;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _changeLike = (element) => {
    if (element.classList.contains('btn_liked')) {
      this._handLikeClick(this._idCard, this._elementBtnLikeCard, this._elementCardLikeRate, "del");
    } else {
      this._handLikeClick(this._idCard, this._elementBtnLikeCard, this._elementCardLikeRate);
    }
  }

  _setEventListeners() {
    this._elementCardImg.addEventListener('click', () => {
      this._openPopupImage(this._cardImg, this._cardTitle);
    });

    this._elementBtnLikeCard.addEventListener('click', (evt) => {
      this._changeLike(evt.target);
    });

    if (this._idOwner === idUser) {
      this._elementBtnDelCard.addEventListener('click', () => {
        this._popupWithConfirmDeletion(this._idCard, this._element);
      });
    } else {
      this._elementBtnDelCard.remove();
    };
  }
}


