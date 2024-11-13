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

// Profile
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const cardAddButton = document.querySelector("#card-add-button");

//Profile Edit Form
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-modal-close");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const modalTitleInput = document.querySelector("#profile-title-input");
const modalDescriptionInput = document.querySelector("#profile-description-input");

//Cards
const cardList = document.querySelector("#card-list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;


//Card Add Form
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddCloseButton = document.querySelector("#card-add-close");
const cardAddForm = cardAddModal.querySelector("#card-add-form");
const cardTitleInput = cardAddForm.querySelector("#card-title-input");
const cardLinkInput = cardAddForm.querySelector("#card-image-input");

/*-------------------------------------------------------------------------------*/
/*                                 Functions                                     */
/*-------------------------------------------------------------------------------*/

function openProfileModal() {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

function closeProfileModal() {
  profileEditModal.classList.remove("modal_opened");
}
function openAddModal() {
  cardAddModal.classList.add("modal_opened");
}

function closeAddModal() {
  cardAddModal.classList.remove("modal_opened");
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
  return cardElement;
}


/*-------------------------------------------------------------------------------*/
/*                                Event Handlers                                 */
/*-------------------------------------------------------------------------------*/

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeProfileModal();
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
  closeAddModal();
}

/*-------------------------------------------------------------------------------*/
/*                                Event Listeners                                */
/*-------------------------------------------------------------------------------*/
profileEditButton.addEventListener("click", openProfileModal);

profileCloseButton.addEventListener("click", closeProfileModal);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddButton.addEventListener("click", openAddModal);

cardAddCloseButton.addEventListener("click", closeAddModal);

cardAddForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});

//Notes for next coding session
//(2)code like button to change when user clicks
//(3)add 'delete' icon and code it to delete the card
//(4)code picture modal to open when user clicks on picture
//(5)smooth modal opening and closing