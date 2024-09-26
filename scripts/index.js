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
    name:"Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name:"Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*-------------------------------------------------------------------------------*/
/*                                 Elements                                      */
/*-------------------------------------------------------------------------------*/
const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileCloseButton = document.querySelector('#profile-modal-close');
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const modalTitleInput = document.querySelector("#profile-title-input");
const modalDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");


/*-------------------------------------------------------------------------------*/
/*                                 Functions                                     */
/*-------------------------------------------------------------------------------*/

function openProfileModal() {
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add('modal_opened');
}

function closeProfileModal() {
  profileEditModal.classList.remove('modal_opened');
}

/*-------------------------------------------------------------------------------*/
/*                                Event Handlers                                 */
/*-------------------------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  profileEditModal.classList.remove('modal_opened');
}

/*-------------------------------------------------------------------------------*/
/*                                Event Listeners                                */
/*-------------------------------------------------------------------------------*/
profileEditButton.addEventListener('click', openProfileModal);

profileCloseButton.addEventListener('click', closeProfileModal);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);