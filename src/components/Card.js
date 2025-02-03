export default class Card {
  constructor({ name, link, _id }, cardSelector, handleImageClick, handleCardDelete) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this._handleCardDelete = handleCardDelete;
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
      console.log(this._id);
      console.log(this._cardElement);
      this._handleCardDelete(this._id, this._cardElement);
    });
  }

  _handleLike(button) {
    button.classList.toggle("card__like-button_active");
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
    console.log(this._id)
    return this._cardElement;
  }
}
