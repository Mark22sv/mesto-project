import '../styles/index.css';
import { apiParam, configValidastion } from './variables.js';
import Card from './card';
import Section from './Section';
import UserInfo from './UserInfo';
import Api from './api';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
import PopupWithConfirmDeletion from './PopupWithConfirmDeletion';
import FormValidator from './FormValidator';
import enableValidation from './validate.js';

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

  const profileSelectors = {
    nameSelector: ".profile__name",
    aboutSelector: ".profile__about",
    avatarSelector: ".profile__avatar"
  };

//  >>> Профиль пользователя

let idUser;

const infoUser = new UserInfo(profileSelectors);
const api = new Api(apiParam);



//Функция добавление/удаление лайка
const handLikeClick = (idCard, btnLike, likeRate) => {
  if (btnLike.classList.contains('btn_liked')) {
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
const popupWithConfirmDeletion = new PopupWithConfirmDeletion(('#confirm-popup'),
  {submit: (idCard, cardToDelete) => {
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
const popupWithImage = new PopupWithImage('#picture-popup');
const openPopupImage = (link, name) => {
  popupWithImage.open(link, name);
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
    const cardsList = new Section({
      data: dataCards,
      renderer: (item) => {
        const cardElement = new Card(
          item,
          handLikeClick,
          {popupWithConfirmDeletion: (idCard, cardToDelete) => {
            popupWithConfirmDeletion.open(idCard, cardToDelete)
          }},
          openPopupImage,
          '#card-template');
        const newCard = cardElement.generate();

        cardsList.addItemEnd(newCard);
        },
      },
      cardsContainer
    );

    cardsList.renderItems();
  })
  .catch(err => console.log(`Ошибка.....: ${err}`));


// Сабмит-сохранение на редактирование профиля.
const profilePopup = new PopupWithForm(('#profile-edit-popup'), {
  submit: (data) => {
      profilePopup.setSubmitButtonText('Сохранение...');
      api.setUserInfo(data)
      .then((data) => {
          infoUser.setUserInfo(data);
          profilePopup.close();
      })
      .catch(err => {console.log(err)})
      .finally(() => {
          profilePopup.setSubmitButtonText('Сохранить');
      });
  }
});
profilePopup.setEventListeners();

// Показывает попап редактирования профиля.
profileBtnEdit.addEventListener('click', () => {
  profilePopup.openPopup();
  profilePopup.setInputValues(infoUser.getUserInfo());
  profileNewName.focus();
});

// Сабмит-сохранение на редактирование аватара.
const avatarPopup = new PopupWithForm(('#avatar-edit-popup'), {
  submit: (data) => {
    avatarPopup.setSubmitButtonText('Сохранение...');
    api.setUserAvatar(data)
    .then((data) => {
      infoUser.setUserInfo(data);
      avatarPopup.close();
    })
    .catch(err => {console.log(err)})
    .finally(() => {
      avatarPopup.setSubmitButtonText('Сохранить');
    });
  }
});
avatarPopup.setEventListeners();


// Показывает попап редактирования аватара.
profileAvatar.addEventListener('click', () => {
  avatarPopup.openPopup();
  avatarLink.focus();
});


//  <<< Профиль пользователя

//  >>> Карточки

// Сабмит-сохранение на добавление новой карточки.
const cardSavePopup = new PopupWithForm (('#card-add-popup'), {
  submit: (data) => {
    cardSavePopup.setSubmitButtonText('Сохранение...');
    api.setNewCard(data)
    .then(res => {
      const cardElement = new Card(
        res,
        handLikeClick,
        {popupWithConfirmDeletion: (idCard, cardToDelete) => {
          popupWithConfirmDeletion.open(idCard, cardToDelete)
        }},
        openPopupImage,
        '#card-template');
      const newCard = cardElement.generate();
      const cardRenderer = new Section({
        data: []
      }, cardsContainer);

      cardRenderer.addItemStart(newCard);
      cardSavePopup.close();
    })
    .catch(err => {console.log(err)})
    .finally(() => {
      cardSavePopup.setSubmitButtonText('Создать');
    });
  }
});
cardSavePopup.setEventListeners();

// Показывает попап добавления новой карточки.
profileBtnAddCard.addEventListener('click',() => {
  cardSavePopup.openPopup();
  cardName.focus();
});




//  валидатор.
const formCardValidastion = new FormValidator(configValidastion, "#form-card");
formCardValidastion.enableValidation();


export {idUser};
