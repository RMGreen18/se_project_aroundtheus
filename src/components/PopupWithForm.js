import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

  //accepts two arguments:
    // the popup selector
    // and a callback function that fires on form submit
  constructor({popupSelector, handleFormSubmit}) {
    super({ popupSelector });
    console.log("popupSelector received in PopupWithForm constructor:", popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    //this._popupForm.reset();
    console.log()
    super.close();
  }

  _getInputValues() {
    //collect data from input fields and return object
    //pass data to submission handler as argument
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    handleFormSubmit(this._inputValues);
  }

  setEventListeners() {
    //override parent sEL()
    //add submit event listener to form and call parent sEL() method
    this._popupForm.addEventListener("submit", this._getInputValues);
    super.setEventListeners();
  }
}