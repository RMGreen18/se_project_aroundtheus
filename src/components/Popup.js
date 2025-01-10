export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", closePopupEsc);
    this._popup.addEventListener("mousedown", closeOverlay);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", closePopupEsc);
    this._popup.removeEventListener("mousedown", closeOverlay);
  }
}
