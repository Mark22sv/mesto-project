import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picturePopupImg = document.querySelector('.figure__img'),
      this._picturePopupCaption = document.querySelector('.figure__caption');
  }

  open(link, name) {
    super.openPopup();
    this._picturePopupImg.src = link;
    this._picturePopupImg.alt = name.trim();
    this._picturePopupCaption.innerText = name.trim();
  }
}
