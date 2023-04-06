export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.btn_type_close')
  }

  // Открывает принятый попап.
  openPopup() {
    this._popup.classList.add('popup_opened');
    this._setOpenEventListeners();
  };

  // Закрывает принятый попап.
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._keyHandler);
    this._popup.removeEventListener('mousedown', this._clickHandler);
  };

  //Функция закрытия попапа по иконке
  _setOpenEventListeners() {
    document.addEventListener('keydown', this._keyHandler);
    this._popup.addEventListener('mousedown', this._clickHandler);
  }

  // keydown-обработчик
  _keyHandler = (evt) => {
    // Закрывает попап по Escape.
    if (evt.key === 'Escape') this.closePopup();

  };

  //click-обработчик
  _clickHandler = (evt) => {
    // Закрывает попапы по клику на кнопке закрыть или на попапе вне формы.
    if (evt.target.classList.contains('btn_type_close') || evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  };
}
