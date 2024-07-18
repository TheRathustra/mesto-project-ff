function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationSettings
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.classList.add(validationSettings.errorClass);
  errorElement.textContent = errorMessage;

  const btn = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  btn.classList.add(validationSettings.inactiveButtonClass);
}

function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = "";

  const btn = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  btn.classList.remove(validationSettings.inactiveButtonClass);
}

function isValid(formElement, inputElement, validationSettings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationSettings
    );
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
}

function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationSettings);
    });
  });
}

function enableValidation(validationSettings) {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );

  formList.forEach((formElement) => {
    clearValidation(formElement, validationSettings);
    setEventListeners(formElement, validationSettings);
  });
}

function clearValidation(formElement, validationSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });

  const btn = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  btn.classList.add(validationSettings.inactiveButtonClass);
}

export { enableValidation, clearValidation };
