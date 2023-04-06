import Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, {submit}){
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._popup.querySelector('.btn_type_submit');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._submit = submit;
  }

  //Для сбора данных из полей создадим приватный метод
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
}

  setEventListeners() {
    //super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        // передадим ей объект — результат работы _getInputValues
        this._submit(this._getInputValues());
    });
  }

  close = () => {
    super.closePopup();
    this._form.reset();
 //   this._inputList.forEach((input) => {
 //       this._deleteErrors(input);
 //   })
  }
  // Вызов функции изменения текста
  setSubmitButtonText(content) {
    this._submitButton.textContent = content;
  }
  //Выбираем все инпуты и добавляем в объек значения из разметки(профиля)
  setInputValues(getData) {
    this._inputList.forEach((item) => {
        item.value = getData[item.name];
    })
  }

}