// показать ошибку
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// скрыть ошибку
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}


// проверка ошибки и ее вывод
const checkInputValidity = (formElement, inputElement, config) => {
  // кастомная проверка паттерна
  if (inputElement.dataset.errorMessage) {
    const pattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if (!pattern.test(inputElement.value)) {
      showInputError(formElement, inputElement, inputElement.dataset.errorMessage, config);
      return;
    }
  }

  // стандартная проверка браузера
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// отключить кнопку
const disableSubmitButton = (button, settings) => {
  button.classList.add(settings.inactiveButtonClass);
  button.disabled = true;
}

// включить кнопку
const enableSubmitButton = (button, settings) => {
  button.classList.remove(settings.inactiveButtonClass);
  button.disabled = false;
}

// переключает состояние кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, settings);
  } else {
    enableSubmitButton(buttonElement, settings);
  }
}

// обработчик событий
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

// очистка ошибок формы и отключение кнопки
export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  disableSubmitButton(buttonElement, settings);
}

// обработка всех форм на странице
export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

