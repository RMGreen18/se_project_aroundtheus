import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }
  open({ link, name }) {
    this._popupImage = this._popupElement.querySelector("#modal-image");
    this._popupCaption = this._popupElement.querySelector(
      "#modal-image-caption"
    );
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
