
export default class FormValidator{
  constructor(configValidastion, form){
    this._configValidastion = configValidastion;
    this._formSelector = form;
    this._form = document.querySelector(this._formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._configValidastion.inputSelector));
    this._buttonElement = this._form.querySelector(this._configValidastion.submitButtonSelector);
    this._inputErrorClass = configValidastion.inputErrorClass;
    this._errorClass = configValidastion.errorClass
    this._inactiveButtonClass = configValidastion.inactiveButtonClass;
    this._checkInputValidity =  this._checkInputValidity.bind(this);
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formClassValidation.inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._form.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

}



