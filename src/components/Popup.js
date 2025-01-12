export default class Popup {
  constructor({ popupSelector }) {
    console.log("popupSelector received in Popup constructor:", popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    console.log("this._popupElement after assignment:", this._popupElement);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    //open popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    //close popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    //adds a click event listener to the close icon of the popup
    //also closes when users click on the shaded area around the form

  }
}
