// Показывает сообщение об ошибке для принятого поля формы.
const showInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.setCustomValidity('');
  if (errorElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(params.errorClass);
  }
  inputElement.classList.add(params.inputErrorClass);
};

// Скрывает сообщение об ошибке для принятого поля формы.
const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (errorElement) {
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
  }
  inputElement.classList.remove(params.inputErrorClass);
};

// Проверяет валидность принятого поля.
const isValid = (formElement, inputElement, params) => {
  inputElement.validity.valid
    ? hideInputError(formElement, inputElement, params)
    : showInputError(formElement, inputElement, params);
};

// Проверяет валидность полей из принятого массива.
// Возвращает true, если находит невалидный input.
const hasInvalidInput = inputElements => {
  return inputElements.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

// Контролирует доступность принятой кнопки
// на основании валидности полей из принятого массива.
const toggleButtonState = (buttonElement, inputElements, params) => {
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(params.inactiveButtonClass);
  }
};

// Прикручивает слушатели инпутам формы
const setEventListeners = (formElement, params) => {
  const inputElements = Array.from(formElement.querySelectorAll(params.inputSelector)),
    buttonElement = formElement.querySelector(params.submitButtonSelector);

  toggleButtonState(buttonElement, inputElements, params);
  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, params);
      toggleButtonState(buttonElement, inputElements, params);
    });
  });

  formElement.addEventListener('reset', () => {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
  });
};

export default params => {
  const formElements = Array.from(document.querySelectorAll(params.formSelector));

  formElements.forEach(formElement => {
    setEventListeners(formElement, params);
  });
};
