const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*-------------------------------------------------------------------------------*/
/*                                 Elements                                      */
/*-------------------------------------------------------------------------------*/
//Modal
const profileEditModal = document.querySelector("#profile-edit-modal");
const cardAddModal = document.querySelector("#card-add-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const closeButtons = document.querySelectorAll(".modal__close");

// Profile
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const cardAddButton = document.querySelector("#card-add-button");

//Profile Edit Form
const profileEditForm = document.forms["profile-edit-form"];
const modalTitleInput = document.querySelector("#profile-title-input");
const modalDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Cards
const cardList = document.querySelector("#card-list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Card Add Form
const cardAddForm = document.forms["card-add-form"];
const cardTitleInput = cardAddForm.querySelector("#card-title-input");
const cardLinkInput = cardAddForm.querySelector("#card-image-input");

//Image Preview
const modalPreview = previewImageModal.querySelector("#modal-preview");
const modalPreviewCaption = previewImageModal.querySelector(
  "#modal-preview-caption"
);

/*-------------------------------------------------------------------------------*/
/*                                 Functions                                     */
/*-------------------------------------------------------------------------------*/

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}
function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector("#card-title");
  const cardElementImage = cardElement.querySelector("#card-image");
  const cardLikeButton = cardElement.querySelector("#card-like-button");
  const cardTrashButton = cardElement.querySelector("#card-trash-button");
  cardElementTitle.textContent = data.name;
  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });
  cardTrashButton.addEventListener("click", () => {
    const currentCard = cardTrashButton.closest("#card-element");
    currentCard.remove();
  });
  cardElementImage.addEventListener("click", () => {
    openPopup(previewImageModal);
    modalPreview.src = data.link;
    modalPreview.alt = data.name;
    modalPreviewCaption.textContent = data.name;
  });
  return cardElement;
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
  const cardElement = getCardElement({
    name,
    link,
  });
  cardList.prepend(cardElement);
  evt.target.reset();
  closePopup(cardAddModal);
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

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});

