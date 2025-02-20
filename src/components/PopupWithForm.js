import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitButtonSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = document.querySelector(submitButtonSelector);
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
  }

  close() {
    super.close();
  }

  _getInputValues = () => {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  };

  getForm() {
    return this._popupForm;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  clearInputs() {
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
