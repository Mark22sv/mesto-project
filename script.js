const content = document.querySelector('.content');


// Функция открыть (закрыть) popup

function openPopup(popupElement, popupMod) {
  popupElement.classList.add(`${popupMod}`);
}

function closePopup(popupElement, popupMod) {
  popupElement.classList.remove(`${popupMod}`);
}

// Открыть (закрыть) popup

const profileEditButton = content.querySelector('.profile__edit-button');
const popup = content.querySelector('.popup');
const popupCloseIcon = popup.querySelector('.popup__close-icon');

profileEditButton.addEventListener('click', () => {
  openPopup(popup, 'popup_opened');
});
popupCloseIcon.addEventListener('click', () => {
  closePopup(popup, 'popup_opened');
});

// Открыть (закрыть) popup-edit

const popupEdit = content.querySelector('.popup-edit');
const profileAddButton = content.querySelector('.profile__add-button');
const popupEditCloseIcon = popupEdit.querySelector('.popup-edit__close-icon');

profileAddButton.addEventListener('click', () => {
  openPopup(popupEdit, 'popup-edit_opened');
});
popupEditCloseIcon.addEventListener('click', () => {
  closePopup(popupEdit, 'popup-edit_opened');
});

// Сохранение данных пользователя popup

const formElement = document.querySelector('.popup__user-data');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#about-me');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    const profileName = document.querySelector('.profile__name');
    const profileProfession = document.querySelector('.profile__profession');
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popup, 'popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);

// Карточки построение

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementList = document.querySelector ('.elements__list');
const cardTemplate = document.querySelector('#cards').content;
for (let i = 0; i < initialCards.length; i++){
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
cardElement.querySelector('.element__photo').src = initialCards[i].link;
cardElement.querySelector('.element__photo').alt = initialCards[i].name;
cardElement.querySelector('.element__title').textContent = initialCards[i].name;
cardElement.querySelector(".element__delete-icon").addEventListener('click', function (evt){
  const deleteButton = evt.target.closest('.element');
  deleteButton.remove();
});
cardElement.querySelector('.element__vector').addEventListener('click', function (evt){
  evt.target.classList.toggle('element__vector_active');
});

cardElement.querySelector('.element__photo').addEventListener('click', () => {
  makeImage(initialCards[i].link, initialCards[i].name);
});

elementList.append(cardElement);
}

// Карточки добавление

// Функция создания карточки

function makeCard (titleName, linkName) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__photo').src = linkName;
  cardElement.querySelector('.element__photo').alt = titleName;
  cardElement.querySelector('.element__title').textContent = titleName;
  cardElement.querySelector(".element__delete-icon").addEventListener('click', function (evt){
    const deleteButton = evt.target.closest('.element');
    deleteButton.remove();
  });
  cardElement.querySelector('.element__vector').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__vector_active');
  });

  cardElement.querySelector('.element__photo').addEventListener('click', () => {
    makeImage(linkName, titleName);
  });


  elementList.prepend(cardElement);
}

// Получение данных карточки

const formElementCards = document.querySelector('.popup-edit__data');
const titleInput = formElementCards.querySelector('#title');
const linkInput = formElementCards.querySelector('#link');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitCards(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    const titleName = titleInput.value;
    const linkName = linkInput.value;
    closePopup(popupEdit, 'popup-edit_opened');
    makeCard (titleName, linkName);
}
formElementCards.addEventListener('submit', handleFormSubmitCards);

// Открытие popup-image

const popupImage = content.querySelector('.popup-image');
const closePopupImage = content.querySelector('.popup-image__close-icon');

function makeImage(linkName, titleName) {
  const popupImagePhoto = content.querySelector('.popup-image__photo');
  const popupImageTitle = content.querySelector('.popup-image__title');
  popupImagePhoto.src = linkName;
  popupImagePhoto.alt = titleName;
  popupImageTitle.textContent = titleName;
  openPopup(popupImage, 'popup-image_opened');
}

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage, 'popup-image_opened');
});


