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
const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.btn_type_submit',
  inactiveButtonClass: 'btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//API параметры
const apiParam = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20/',
  headers: {
    authorization: '75975255-f606-4238-8a2f-4f7678e008f9',
    'Content-Type': 'application/json'
  }
};


//Селекторы popup
const popupSelector = {
  popupConfirm: '#confirm-popup',
  popupPicture: '#picture-popup',
  popupEditProfile: '#profile-edit-popup',
  popupEditAvatar: '#avatar-edit-popup',
  popupAddCard: '#card-add-popup'
};

//Селекторы профиля
const profileSelectors = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar"
};

export { configValidation, apiParam, popupSelector, profileSelectors };
