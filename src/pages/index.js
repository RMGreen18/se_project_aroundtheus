import {
  avatarEditButton,
  avatarEditForm,
  profileEditButton,
  cardAddButton,
  profileEditForm,
  modalTitleInput,
  modalDescriptionInput,
  cardList,
  cardAddForm,
  config,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
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
  imageSelector: "#profile-image"
});

let cardsSection;

api.getUserAndCardInfo().then(([serverUserInfo, serverCards]) => {
  console.log(serverUserInfo);
  console.log(serverCards);
  userInfo.setUserInfo({title: serverUserInfo.name, description: serverUserInfo.about, avatar: serverUserInfo.avatar})
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

const avatarEditPopup = new PopupWithForm({
  popupSelector: "#avatar-edit-modal",
  handleFormSubmit: handleAvatarFormSubmit,
})
avatarEditPopup.setEventListeners();

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  handleFormSubmit: handleCardFormSubmit,
});
cardAddPopup.setEventListeners();

const previewImagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
previewImagePopup.setEventListeners();

const deleteConfirmPopup = new PopupWithConfirm({
  popupSelector: "#delete-confirm-modal"
});
deleteConfirmPopup.setEventListeners();

/*-------------------------------------------------------------------------------*/
/*                                 Functions                                     */
/*-------------------------------------------------------------------------------*/

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick, handleCardLike, handleCardDelete);
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
  .catch((err) => {
    console.error(err);
  });
  profileFormValidator.resetValidation();
  profileEditPopup.close();
}

function handleAvatarFormSubmit(data) {
  console.log(data.link);
api.updateAvatar(data.link)
.catch((err) => {
  console.error(err);
});
userInfo.setAvatar(data.link);
avatarFormValidator.resetValidation();
avatarEditPopup.close();
}

function handleCardFormSubmit(data) {
  api.addCard(data)
  .then((card) => {
  renderCard(card, cardList);
  cardFormValidator.resetValidation();
  cardAddPopup.close();})
  .catch((err) => {
    console.error(err);
  });
}


function handleImageClick({ link, name }) {
  previewImagePopup.open({ link, name });
}

function handleCardDelete(cardId, card) {
  console.log(cardId);
  console.log(card);
  deleteConfirmPopup.open();
deleteConfirmPopup.setConfirmFunction( () => {
  api.removeCard(cardId)
  .catch((err) => {
    console.error(err);
  });
  card.remove();
  deleteConfirmPopup.close()
});
}

function handleCardLike(card, likeStatus, cardId) {
if(!likeStatus){
  api.addCardLike(cardId).then((res) => {
    console.log(res.isLiked);
    card.setLiked(res.isLiked);
  }
)
.catch((err) => {
  console.error(err);
});
}
else {
  api.removeCardLike(cardId).then((res) => {
    console.log(res.isLiked);
    card.setLiked(res.isLiked);
  }
)
.catch((err) => {
  console.error(err);
});
}
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

avatarEditButton.addEventListener("click", function () {
  avatarEditPopup.open();
})

cardAddButton.addEventListener("click", function () {
  cardAddPopup.open();
});
/*-------------------------------------------------------------------------------*/
/*                                  Validation                                   */
/*-------------------------------------------------------------------------------*/

const profileFormValidator = new FormValidator(config, profileEditForm);
const avatarFormValidator = new FormValidator(config, avatarEditForm)
const cardFormValidator = new FormValidator(config, cardAddForm);


profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
cardFormValidator.enableValidation();