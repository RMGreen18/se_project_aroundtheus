import {
  initialCards,
  profileEditModal,
  cardAddModal,
  previewImageModal,
  closeButtons,
  profileEditButton,
  profileTitle,
  profileDescription,
  cardAddButton,
  profileEditForm,
  modalTitleInput,
  modalDescriptionInput,
  cardList,
  cardAddForm,
  cardTitleInput,
  cardLinkInput,
  modalPreview,
  modalPreviewCaption,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

/*-------------------------------------------------------------------------------*/
/*                                 Functions                                     */
/*-------------------------------------------------------------------------------*/

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closeOverlay);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closeOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function closeOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
}
function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.generateCardElement();
}
function renderCard(data, wrap) {
  const card = createCard(data);
  wrap.prepend(card);
}

/*-------------------------------------------------------------------------------*/
/*                                Event Handlers                                 */
/*-------------------------------------------------------------------------------*/

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({
    name,
    link,
  }, cardList);
  evt.target.reset();
  closePopup(cardAddModal);
}

function handleImageClick(data) {
  modalPreview.src = data.link;
  modalPreview.alt = data.name;
  modalPreviewCaption.textContent = data.name;
  openPopup(previewImageModal);
}
/*-------------------------------------------------------------------------------*/
/*                                Event Listeners                                */
/*-------------------------------------------------------------------------------*/
profileEditButton.addEventListener("click", function () {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", function () {
  openPopup(cardAddModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleCardFormSubmit);

/*-------------------------------------------------------------------------------*/
/*                                  Validation                                   */
/*-------------------------------------------------------------------------------*/

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardAddForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

initialCards.forEach((initialCard) => {
  renderCard(initialCard, cardList);
});
