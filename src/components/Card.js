export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });

    this._buttonLike.addEventListener("click", () => {
      this._handleLike(this._buttonLike);
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDelete(this._buttonDelete);
    });
  }

  _handleLike(button) {
    button.classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._cardElement.remove();
  }

  generateCardElement() {
    this._cardElement = this._getTemplate();
    this._buttonLike = this._cardElement.querySelector("#card-like-button");
    this._buttonDelete = this._cardElement.querySelector("#card-trash-button");
    this._cardTitleElement = this._cardElement.querySelector("#card-title");
    this._cardImageElement = this._cardElement.querySelector("#card-image");
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
