export default class Card {
  constructor({name, link}, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const cardImageElement = this._cardElement.querySelector("#card-image");
    const buttonLike = this._cardElement.querySelector("#card-like-button");
    const buttonDelete = this._cardElement.querySelector("#card-trash-button");

    cardImageElement.addEventListener('click', () => {
      this._handleImageClick({link: this._link, name: this._name});
  });

  buttonLike.addEventListener('click', () => {
    this._handleLike(buttonLike);
  });

  buttonDelete.addEventListener('click', () => {
    this._handleDelete(buttonDelete);
  });

  }

  _handleLike(button) {
    button.classList.toggle("card__like-button_active");
  }

  _handleDelete(button) {
    const currentCard = button.closest("#card-element")
    currentCard.remove();
  }

  generateCardElement() {
    this._cardElement = this._getTemplate();
    this._cardTitleElement = this._cardElement.querySelector("#card-title");
    this._cardImageElement = this._cardElement.querySelector("#card-image");
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

}