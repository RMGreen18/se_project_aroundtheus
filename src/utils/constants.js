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
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const cardAddModal = document.querySelector("#card-add-modal");
export const previewImageModal = document.querySelector("#preview-image-modal");
export const closeButtons = document.querySelectorAll(".modal__close");

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
export const modalPreview = previewImageModal.querySelector("#modal-preview");
export const modalPreviewCaption = previewImageModal.querySelector(
  "#modal-preview-caption"
);