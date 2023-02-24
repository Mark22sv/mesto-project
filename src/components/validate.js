// Валидация

const showInputError = (formElement, inputElement, errorMessage, formClassValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formClassValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formClassValidation.errorClass);
};

const hideInputError = (formElement, inputElement, formClassValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formClassValidation.inputErrorClass);
  errorElement.classList.remove(formClassValidation.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formClassValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
    }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formClassValidation);
  } else {
    hideInputError(formElement, inputElement, formClassValidation);
  }
};

const setEventListeners = (formElement, formClassValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(formClassValidation.inputSelector));
  const buttonElement = formElement.querySelector(formClassValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formClassValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formClassValidation);
      toggleButtonState(inputList, buttonElement, formClassValidation);
    });
  });
};

const enableValidation = (formClassValidation) => {
  const formList = Array.from(document.querySelectorAll(formClassValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, formClassValidation);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

function toggleButtonState(inputList, buttonElement, formClassValidation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(formClassValidation.inactiveButtonClass);
} else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(formClassValidation.inactiveButtonClass);
}
}

export { enableValidation };
