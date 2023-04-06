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
    this._setEventListeners();

    this._element.querySelector('.card__img').src = this._cardImg;
    this._element.querySelector('.card__img').alt = this._cardImg;
    this._element.querySelector('.card__title').textContent = this._cardTitle;
    this._element.querySelector('.card__like-rate').textContent = this._likeRate;

    if (-1 !== this._likes.findIndex(element => element._id === idUser)) {
      this._element.querySelector('.btn_type_like').classList.add('btn_liked');
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

  _setEventListeners() {
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._openPopupImage(this._cardImg, this._cardTitle);
    });

    this._element.querySelector('.btn_type_like').addEventListener('click', () => {
      const btnLike = this._element.querySelector('.btn_type_like'),
        likeRate = this._element.querySelector('.card__like-rate');
      this._handLikeClick(this._idCard, btnLike, likeRate);

    });

    if (this._idOwner === idUser) {
      this._element.querySelector('.btn_type_del').addEventListener('click', () => {
        this._popupWithConfirmDeletion(this._idCard, this._element);
      });
    } else {
      this._element.querySelector('.btn_type_del').remove();
    };
  }
}


