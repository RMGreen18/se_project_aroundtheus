import {
  avatarEditButton,
  profileEditButton,
  cardAddButton,
  modalTitleInput,
  modalDescriptionInput,
  cardList,
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
  imageSelector: "#profile-image",
});

let cardsSection;

api
  .getUserAndCardInfo()
  .then(([serverUserInfo, serverCards]) => {
    userInfo.setProfileInfo({
      title: serverUserInfo.name,
      description: serverUserInfo.about,
      avatar: serverUserInfo.avatar,
    });
    cardsSection = new Section(
      { items: serverCards, renderer: renderCard },
      cardList
    );
    cardsSection.renderItems(serverCards);
  })
  .catch((err) => {
    console.error(err);
  });

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  submitButtonSelector: "#profile-submit-button",
  handleFormSubmit: handleProfileFormSubmit,
});
profileEditPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm({
  popupSelector: "#avatar-edit-modal",
  submitButtonSelector: "#avatar-submit-button",
  handleFormSubmit: handleAvatarFormSubmit,
});
avatarEditPopup.setEventListeners();

const cardAddPopup = new PopupWithForm({
  popupSelector: "#card-add-modal",
  submitButtonSelector: "#card-submit-button",
  handleFormSubmit: handleCardFormSubmit,
});
cardAddPopup.setEventListeners();

const previewImagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
previewImagePopup.setEventListeners();

const deleteConfirmPopup = new PopupWithConfirm({
  popupSelector: "#delete-confirm-modal",
});
deleteConfirmPopup.setEventListeners();

/*-------------------------------------------------------------------------------*/
/*                                 Functions                                     */
/*-------------------------------------------------------------------------------*/

function createCard(item) {
  const cardElement = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleCardLike,
    handleCardDelete
  );
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
  profileEditPopup.renderLoading(true);
  api
    .updateUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
    })
    .then(() => {
      profileFormValidator.disableSubmit();
    })
    .then(() => {
      profileEditPopup.clearInputs();
    })
    .then(() => {
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => profileEditPopup.renderLoading(false));
}

function handleAvatarFormSubmit(data) {
  avatarEditPopup.renderLoading(true);
  api
    .updateAvatar(data.link)
    .then((res) => {
      userInfo.setAvatar(res);
    })
    .then(() => {
      avatarFormValidator.disableSubmit();
    })
    .then(() => {
      avatarEditPopup.clearInputs();
    })
    .then(() => {
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => avatarEditPopup.renderLoading(false));
}

function handleCardFormSubmit(data) {
  cardAddPopup.renderLoading(true);
  api
    .addCard(data)
    .then((card) => {
      renderCard(card, cardList);
    })
    .then(() => {
      cardFormValidator.disableSubmit();
    })
    .then(() => {
      cardAddPopup.clearInputs();
    })
    .then(() => {
      cardAddPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => cardAddPopup.renderLoading(false));
}

function handleImageClick({ link, name }) {
  previewImagePopup.open({ link, name });
}

function handleCardDelete(cardId, card) {
  deleteConfirmPopup.open();
  deleteConfirmPopup.setConfirmFunction(() => {
    api
      .removeCard(cardId)
      .then(() => {
        card.remove();
      })
      .then(() => {
        deleteConfirmPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleCardLike(card, likeStatus, cardId) {
  if (!likeStatus) {
    api
      .addCardLike(cardId)
      .then((res) => {
        card.setLiked(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .removeCardLike(cardId)
      .then((res) => {
        card.setLiked(res.isLiked);
      })
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
});

cardAddButton.addEventListener("click", function () {
  cardAddPopup.open();
});
/*-------------------------------------------------------------------------------*/
/*                                  Validation                                   */
/*-------------------------------------------------------------------------------*/

const profileFormValidator = new FormValidator(
  config,
  profileEditPopup.getForm()
);
const avatarFormValidator = new FormValidator(
  config,
  avatarEditPopup.getForm()
);
const cardFormValidator = new FormValidator(config, cardAddPopup.getForm());

profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
cardFormValidator.enableValidation();
