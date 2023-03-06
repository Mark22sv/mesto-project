const content = document.querySelector('.content');
const formEditProfile = document.forms['user-data'];
const nameInput = content.querySelector('#name');
const jobInput = content.querySelector('#about-me');
const profileName = content.querySelector('.profile__name');
const profileProfession = content.querySelector('.profile__profession');
const profileAvatar = content.querySelector('.profile__avatar');
const profileChangeAvatar = content.querySelector('.profile__change-avatar');
const popupChangeAvatar = content.querySelector('.popup__change-avatar')
const popupEditProfile = content.querySelector('.popup__edit-profile');
const profileEditButton = content.querySelector('.profile__edit-button');
const popupAddCard = content.querySelector('.popup__add-card');
const cardAddbutton = content.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const formAddCard = document.forms['image-data'];
const formChangeAvatar = document.forms['avatar-data'];
const configValidstion =
{
  formSelector: '.popup__data',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
};
let userId;

export { nameInput, jobInput, profileName, profileProfession, popups, userId, profileAvatar };
import './pages/index.css';
import { getCards, getDataUser } from './components/api.js';
import { enableValidation } from './components/validate.js';
import { createCard, addCard } from './components/card.js';
import { submitAddCardsForm, submitEditProfileForm, submitChangeAvatar } from './components/modal.js';
import { openPopup, closePopup } from './components/utils.js';


// Вызов функции создания карточек



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

//Изменение аватара
profileAvatar.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
});
profileChangeAvatar.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
});

formChangeAvatar.addEventListener('submit', submitChangeAvatar);



//закрытие popup по overlry
popups.forEach(element => element.addEventListener('mousedown', evt => {
  (evt.target.classList.contains('popup_opened') ||
  evt.target.classList.contains('popup__close-icon'))
  ? closePopup() : null;
  })
);
//Валидация
enableValidation(configValidstion);

//Получение карточек
getCards()
  .then((result) => {
    for (let i = result.length - 1; i >= 0; i--){
      const newCard = createCard(result[i].name, result[i].link, result[i].owner._id, result[i].likes, result[i]._id);
    addCard(newCard);
    }
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
//Получение данных пользователя
getDataUser()
  .then((result) => {
    profileName.textContent = result.name;
    profileProfession.textContent = result.about;
    profileAvatar.src = result.avatar;
    userId = result._id;
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});


