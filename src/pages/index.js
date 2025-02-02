import {
  profileEditButton,
  cardAddButton,
  profileEditForm,
  modalTitleInput,
  modalDescriptionInput,
  cardList,
  cardAddForm,
  config,
  initialCards
} from "../utils/constants.js";
import Api from "../components/Api.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bef088e1-2ae1-4a7b-9925-57c1eac9ed1e",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
});

let cardsSection;

api.getUserAndCardInfo().then(([serverUserInfo, serverCards]) => {
  console.log(serverUserInfo);
  userInfo.setUserInfo({title: serverUserInfo.name, description: serverUserInfo.about})
  cardsSection =
  new Section(
    { items: serverCards, renderer: renderCard },
    cardList
  );

  api.getInitialCards().then(data => {
    cardsSection.renderItems(data);
  })
  .catch((err) => {
    console.error(err);
  })
})


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
  api.updateUserInfo(userInfo.getUserInfo())
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

// document.addEventListener("DOMContentLoaded", function () {
//   api.getUserInfo()
//   .then((res) => {
//     return res;
//   })
//   .then((res) => {
//      console.log(res);
//      userInfo.setUserInfo({title: res.name, description: res.about});
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// })

/*-------------------------------------------------------------------------------*/
/*                                  Validation                                   */
/*-------------------------------------------------------------------------------*/

const profileFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardAddForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();


//test
api.getUserInfo();

//api.getInitialCards();