import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

  //accepts two arguments:
    // the popup selector
    // and a callback function that fires on form submit
  constructor({popupSelector, handleFormSubmit}) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popupForm.querySelectorAll(".modal__input"));
    console.log(this._inputList);

  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues = () => {
    //collect data from input fields and return object
    //pass data to submission handler as argument
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    //override parent sEL()
    //add submit event listener to form and call parent sEL() method
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}