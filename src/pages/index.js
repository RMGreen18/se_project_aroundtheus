import {
  initialCards,
  profileEditButton,
  cardAddButton,
  profileEditForm,
  modalTitleInput,
  modalDescriptionInput,
  cardList,
  cardAddForm,
  config,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

/*-------------------------------------------------------------------------------*/
/*                                 Elements                                      */
/*-------------------------------------------------------------------------------*/
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
});

const cardsSection = new Section(
  { items: initialCards, renderer: renderCard },
  cardList
);
cardsSection.renderItems();

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});
profileEditPopup.setEventListeners();

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardFormSubmit,
});
cardAddPopup.setEventListeners();

const previewImagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
previewImagePopup.setEventListeners();
/*-------------------------------------------------------------------------------*/
/*                                 Functions                                     */
/*-------------------------------------------------------------------------------*/

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

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
}

function handleCardFormSubmit(data) {
  renderCard(data, cardList);
  cardAddPopup.close();
}

function handleImageClick({ link, name }) {
  previewImagePopup.open({ link, name });
}
/*-------------------------------------------------------------------------------*/
/*                                Event Listeners                                */
/*-------------------------------------------------------------------------------*/
profileEditButton.addEventListener("click", function () {
  modalTitleInput.value = userInfo._nameElement.textContent;
  modalDescriptionInput.value = userInfo._jobElement.textContent;
  profileEditPopup.open();
});

cardAddButton.addEventListener("click", function () {
  cardAddPopup.open();
});

/*-------------------------------------------------------------------------------*/
/*                                  Validation                                   */
/*-------------------------------------------------------------------------------*/

const profileFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardAddForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
