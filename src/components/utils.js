import { popup } from "../index.js";

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.forEach((element) => element.classList.remove('popup_opened'));
}

export { openPopup, closePopup };

