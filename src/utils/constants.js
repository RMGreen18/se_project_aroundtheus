//Initial Cards
export const initialCards = [
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

//Popups
//REMOVE
//export const previewImageModal = document.querySelector("#preview-image-modal");
//export const closeButtons = document.querySelectorAll(".modal__close");

// Profile
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileTitle = document.querySelector("#profile-title");
export const profileDescription = document.querySelector("#profile-description");
export const cardAddButton = document.querySelector("#card-add-button");

//Profile Edit Form
export const profileEditForm = document.forms["profile-edit-form"];
export const modalTitleInput = document.querySelector("#profile-title-input");
export const modalDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Cards
export const cardList = document.querySelector("#card-list");

//Card Add Form
export const cardAddForm = document.forms["card-add-form"];
export const cardTitleInput = cardAddForm.querySelector("#card-title-input");
export const cardLinkInput = cardAddForm.querySelector("#card-image-input");

//Image Preview
//REMOVE
//export const modalImage = previewImageModal.querySelector("#modal-image");
/* export const modalImageCaption = previewImageModal.querySelector(
  "#modal-image-caption"
); */

//config
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};