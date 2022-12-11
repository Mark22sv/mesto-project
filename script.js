const content = document.querySelector('.content');
const formEditProfile =content.querySelector('#form-edit-profile')
const nameInput = content.querySelector('#name');
const jobInput = content.querySelector('#about-me');
const profileName = content.querySelector('.profile__name');
const profileProfession = content.querySelector('.profile__profession');
const popupEditProfile = content.querySelector('.popup__edit-profile');
const profileEditButton = content.querySelector('.profile__edit-button');
const popupAddCard = content.querySelector('.popup__add-card');
const cardAddbutton = content.querySelector('.profile__add-button');
const popupCloseIcon = content.querySelectorAll('.popup__close-icon');
const elementList = document.querySelector ('.elements__list');
const cardTemplate = document.querySelector('#cards').content;
const formAddCard = document.querySelector('#form-add-card');
const titleInput = formAddCard.querySelector('#title');
const linkInput = formAddCard.querySelector('#link');
const popupImage = content.querySelector('.popup__image');
const popupImagePhoto = content.querySelector('.popup__photo');
const popupImageTitle = content.querySelector('.popup__title');

// Функция открыть (закрыть) popup

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// Функция получения данных пользователя

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  nameInput.value;
  jobInput.value;
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

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

  cardElement.querySelector('.element__photo').addEventListener('click', () => {
    openPopupImage(linkName, titleName);
  });
  AddCard(cardElement);
}

// Функция добавления карточки

function AddCard(cardElement) {
  elementList.prepend(cardElement);
}

// Функция получение данных карточки

function handleFormSubmitCards(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  const titleName = titleInput.value;
  const linkName = linkInput.value;
  closePopup(popupAddCard);
  createCard (titleName, linkName);
  titleInput.value = "Название";
  linkInput.value = "Ссылка на картинку";
}

// Функция открытия popup-image

function openPopupImage(linkName, titleName) {
  popupImagePhoto.src = linkName;
  popupImagePhoto.alt = titleName;
  popupImageTitle.textContent = titleName;
  openPopup(popupImage);
}

// Вызов функции создания карточек

for (let i = 0; i < initialCards.length; i++){
  createCard(initialCards[i].name, initialCards[i].link);
}

// Установка слушателей

// Редактировать профиль
formEditProfile.addEventListener('submit', handleFormSubmit);

// Открыть (закрыть) popup
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupEditProfile);
});

cardAddbutton.addEventListener('click', () => {

  openPopup(popupAddCard);
});

popupCloseIcon.forEach(element => element.addEventListener('click', () => {
  closePopup(element.closest('.popup'));
})
);

// Карточки добавление
formAddCard.addEventListener('submit', handleFormSubmitCards);




