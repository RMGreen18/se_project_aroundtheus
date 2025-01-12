import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    console.log("popupSelector received in PopupWithImage constructor:", popupSelector);
  super({ popupSelector });
  }
   open({data}) {
    this._popupImage = this._popupElement.querySelector("#modal-image");
    this._popupImage.src = data.link;
    this._popupCaption.alt = data.name;
    this._popupCaption.textContent = data.name;

    //override the parent’s open() method
    super.close();
    //accept the name and link of the card as arguments
    //add an image to the popup and the corresponding image src attribute
    //add a caption for the image
    // call in the image click handler in index.js
  } 
}