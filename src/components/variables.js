// "Коробка" с карточками.
/*
const imgSterlitamak      = new URL('../images/photo-01.jpg', import.meta.url);
const imgKamchatka        = new URL('../images/photo-02.jpg', import.meta.url);
const imgSmolensk         = new URL('../images/photo-03.jpg', import.meta.url);
const imgSolovki          = new URL('../images/photo-04.jpg', import.meta.url);
const imgKrasnayaPolyana  = new URL('../images/photo-05.jpg', import.meta.url);
const imgRyazan           = new URL('../images/photo-06.jpg', import.meta.url);
const cardsData = [
  {name: 'Стерлитамак',       link: imgSterlitamak},
  {name: 'Камчатский край',   link: imgKamchatka},
  {name: 'Смоленск',          link: imgSmolensk},
  {name: 'Соловки',           link: imgSolovki},
  {name: 'Красная поляна',    link: imgKrasnayaPolyana},
  {name: 'Рязанская область', link: imgRyazan}
];
*/

// параметры валидации
const configValidastion = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.btn_type_submit',
  inactiveButtonClass: 'btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};


const apiParam = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-19/',
  headers: {
    authorization: '0cb3843b-7aeb-441f-9f42-4e44f9d13dd5',
    'Content-Type': 'application/json'
  }
};

const formsForValidation = {
  formCard: "#form-card",
  formUser: "#form-user",
  formAvatar: "#form-avatar"
};

const popupSelector = {
  popupConfirm: '#confirm-popup',
  popupPicture: '#picture-popup',
  popupEditProfile: '#profile-edit-popup',
  popupEditAvatar: '#avatar-edit-popup',
  popupAddCard: '#card-add-popup'
};

const profileSelectors = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar"
};

export {configValidastion, formsForValidation, apiParam, popupSelector, profileSelectors};
