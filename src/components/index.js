import '../styles/index.css';
import { apiParam, configValidation, popupSelector, profileSelectors } from './variables.js';
import Card from './Card';
import Section from './Section';
import UserInfo from './UserInfo';
import Api from './api';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
import PopupWithConfirmDeletion from './PopupWithConfirmDeletion';
import FormValidator from './FormValidator';


const profile = document.querySelector('.profile'),
  profileAvatar = profile.querySelector('.profile__avatar'),
  profileBtnEdit = profile.querySelector('.btn_type_edit'),
  profileBtnAddCard = profile.querySelector('.btn_type_add'),

  profileEditPopup = document.querySelector('#profile-edit-popup'),
  profileNewName = profileEditPopup.querySelector('#profile-new-name'),


  avatarEditPopup = document.querySelector('#avatar-edit-popup'),
  avatarLink = avatarEditPopup.querySelector('#avatar-link'),

  cardAddPopup = document.querySelector('#card-add-popup'),
  cardName = cardAddPopup.querySelector('#card-name'),

  cardsContainer = '.cards';

  let idUser;
  let cardsList;


//  >>> Профиль пользователя


const infoUser = new UserInfo(profileSelectors);
const api = new Api(apiParam);


//Функция добавление/удаление лайка

const handLikeClick = (idCard, btnLike, likeRate, method) => {
  if (method === "del") {
    api.delLike(idCard)
      .then(res => {
        likeRate.textContent = res.likes.length;
        btnLike.classList.toggle('btn_liked');
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
  } else {
    api.setLike(idCard)
      .then(res => {
        likeRate.textContent = res.likes.length;
        btnLike.classList.toggle('btn_liked');
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
  }
}

//Функция удаления карточки
const popupWithConfirmDeletion = new PopupWithConfirmDeletion((popupSelector.popupConfirm),
  {
    submit: (idCard, cardToDelete) => {
      api.delCard(idCard)
        .then(res => console.log(res.message))
        .then(() => {
          cardToDelete.remove()
          popupWithConfirmDeletion.close();

        })
        .catch(err => console.log(`Ошибка.....: ${err}`));
    }
  });

//Функция открытия Popup с изображением
const popupWithImage = new PopupWithImage(popupSelector.popupPicture);
const openPopupImage = (link, name) => {
  popupWithImage.open(link, name);
}

//Функция создания карточки
const createCard = (item) => {
  const cardElement = new Card(
    item,
    handLikeClick,
    {
      popupWithConfirmDeletion: (idCard, cardToDelete) => {
        popupWithConfirmDeletion.open(idCard, cardToDelete)
      }
    },
    openPopupImage,
    '#card-template');
  const newCard = cardElement.generate();
  return newCard;
}



//Отрисовка карточек и данных профиля с сервера
Promise.all([
  api.getUser(),
  api.getCards()
])
  .then(([dataUser, dataCards]) => {
    // Получение данных о пользователе с сервера
    infoUser.setUserInfo(dataUser);
    idUser = dataUser._id;
    // Отрисовка карточек с сервера
    cardsList = new Section({
      data: dataCards,
      renderer: (item) => {

        cardsList.addItemEnd(createCard(item));
      },
    },
      cardsContainer
    );

    cardsList.renderItems();
  })
  .catch(err => console.log(`Ошибка.....: ${err}`));

// Сабмит-сохранение на редактирование профиля.
const profilePopup = new PopupWithForm((popupSelector.popupEditProfile), {
  submit: (data) => {
    profilePopup.setSubmitButtonText('Сохранение...');
    api.setUserInfo(data)
      .then((data) => {
        infoUser.setUserInfo(data);
        profilePopup.close();
      })
      .catch(err => { console.log(err) })
      .finally(() => {
        profilePopup.setSubmitButtonText('Сохранить');
      });
  }
});
profilePopup.setEventListeners();

// Сабмит-сохранение на редактирование аватара.
const avatarPopup = new PopupWithForm((popupSelector.popupEditAvatar), {
  submit: (data) => {
    avatarPopup.setSubmitButtonText('Сохранение...');
    api.setUserAvatar(data)
      .then((data) => {
        infoUser.setUserInfo(data);
        avatarPopup.close();
      })
      .catch(err => { console.log(err) })
      .finally(() => {
        avatarPopup.setSubmitButtonText('Сохранить');
      });
  }
});
avatarPopup.setEventListeners();

//  <<< Профиль пользователя

//  >>> Карточки

// Сабмит-сохранение на добавление новой карточки.
const cardSavePopup = new PopupWithForm((popupSelector.popupAddCard), {
  submit: (data) => {
    cardSavePopup.setSubmitButtonText('Сохранение...');
    api.setNewCard(data)
      .then(res => {
        cardsList.addItemStart(createCard(res));
        cardSavePopup.close();
      })
      .catch(err => { console.log(err) })
      .finally(() => {
        cardSavePopup.setSubmitButtonText('Создать');
      });
  }
});
cardSavePopup.setEventListeners();

//  валидатор.
const formValidators = {}
const enableValidation = (сonfig) => {
  const formList = Array.from(document.querySelectorAll(сonfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(сonfig, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configValidation);

// Показывает попап добавления новой карточки.
profileBtnAddCard.addEventListener('click', () => {
  formValidators['add'].resetValidation();
  cardSavePopup.openPopup();
  cardName.focus();
});

// Показывает попап редактирования аватара.
profileAvatar.addEventListener('click', () => {
  formValidators['avatar-edit'].resetValidation();
  avatarPopup.openPopup();
  avatarLink.focus();
});

// Показывает попап редактирования профиля.
profileBtnEdit.addEventListener('click', () => {
  formValidators['profile'].resetValidation();
  profilePopup.openPopup();
  profilePopup.setInputValues(infoUser.getUserInfo());
  profileNewName.focus();
});


export { idUser };
