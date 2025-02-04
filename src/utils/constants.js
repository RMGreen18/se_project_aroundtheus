// Profile
export const avatarEditButton = document.querySelector("#avatar-edit-button");
export const avatarEditForm = document.forms["avatar-edit-form"];
export const profileEditButton = document.querySelector("#profile-edit-button");
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

//config
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input-type_error",
  errorClass: "modal__error_visible",
};
