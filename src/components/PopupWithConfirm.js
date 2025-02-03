import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }
  close() {
    super.close();
  }

  setConfirmFunction(confirmFunction) {
    this._confirmFunction = confirmFunction;
  }


  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if(this._confirmFunction) {
        this._confirmFunction();
      }
    });
    super.setEventListeners();
  }
}