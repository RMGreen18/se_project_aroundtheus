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

function renderCard(data) {
  const card = createCard(data);
  cardsSection.addItem(card);
}

/*-------------------------------------------------------------------------------*/
/*                                Event Handlers                                 */
/*-------------------------------------------------------------------------------*/

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileFormValidator.resetValidation();
  profileEditPopup.close();
}

function handleCardFormSubmit(data) {
  renderCard(data, cardList);
  cardFormValidator.resetValidation();
  cardAddPopup.close();
}

function handleImageClick({ link, name }) {
  previewImagePopup.open({ link, name });
}
/*-------------------------------------------------------------------------------*/
/*                                Event Listeners                                */
/*-------------------------------------------------------------------------------*/
profileEditButton.addEventListener("click", function () {
  const userData = userInfo.getUserInfo();
  modalTitleInput.value = userData.title;
  modalDescriptionInput.value = userData.description;
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
