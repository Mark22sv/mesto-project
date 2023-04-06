import { popups } from "./index.js";

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

function closePopup() {
  popups.forEach((element) => element.classList.remove('popup_opened'));
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

export { openPopup, closePopup };

