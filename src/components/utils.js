import { popup } from "../index.js";

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addListenerPopup();
  disActivetedButton(popup);
}

function closePopup() {
  popup.forEach((element) => element.classList.remove('popup_opened'));
  document.removeEventListener('keydown', keyHandler);
}

function addListenerPopup(){
  document.addEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function disActivetedButton(button){
  if (button.id == 'popup-submit-form'){
  const buttonElement = button.querySelector('.popup__submit-button');
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add('popup__submit-button_inactive');
  }
}

export { openPopup, closePopup };

