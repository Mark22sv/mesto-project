import Popup from "./Popup";

export default class PopupWithConfirmDeletion extends Popup{
  constructor(popupSelector, {submit}) {
    super(popupSelector);
    this._submit = submit,
    this._form = this._popup.querySelector('.form')

  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._confirmDeletion);
  }

  _removeEventListener() {
    this._form.removeEventListener('submit', this._confirmDeletion);
  }

  _confirmDeletion = (evt) => {
    evt.preventDefault();
    this._submit(this._idCard, this._cardToDelete);
  }

  open = (idCard, cardToDelete) => {
    super.openPopup();
    this._setEventListeners();
    this._idCard = idCard;
    this._cardToDelete = cardToDelete;
  }

  close = () => {
    super.closePopup();
    this._removeEventListener();
  }
}
