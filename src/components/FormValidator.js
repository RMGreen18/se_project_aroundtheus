export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector= config.inputSelector;
    this._submitButtonSelector= config.submitButtonSelector;
    this._inactiveButtonClass= config.inactiveButtonClass;
    this._inputErrorClass= config.inputErrorClass;
    this._errorClass= config.errorClass;

    this._element = formElement;
    this._inputElements = [...this._element.querySelectorAll(this._inputSelector)];
    this._submitButton = this._element.querySelector(this._submitButtonSelector);
  }
  _showInputError(inputElement) {
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    let foundInvalid = false;

    this._inputElements.forEach((inputElement) => {
      if (!inputElement.validity.valid) foundInvalid = true;
    });

    if (foundInvalid) {
      this._disableSubmit();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _disableSubmit() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableValidation() {
      this._element.addEventListener("submit", (e) => {
        e.preventDefault();
        this._disableSubmit();
      });

      this._setEventListeners();
  }
}
