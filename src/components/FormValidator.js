
export default class FormValidator{
  constructor(configValidation, form){
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(configValidation.inputSelector));
    this._buttonElement = this._form.querySelector(configValidation.submitButtonSelector);
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass
    this._inactiveButtonClass = configValidation.inactiveButtonClass;

  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _showInputError = (inputElement, errorElement, errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
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
      inputElement.addEventListener('input', () => {
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
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

}



