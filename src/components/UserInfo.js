export default class UserInfo {
  constructor({ nameSelector, jobSelector, imageSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._imageElement = document.querySelector(imageSelector);
  }


  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._jobElement.textContent,
      avatar: this._imageElement.src,
    };
  }

  setAvatar({ avatar }) {
    this._imageElement.src = avatar;
  }

  setUserInfo({ title, description }) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = description;
  }

  setProfileInfo({ title, description, avatar }) {
    this.setUserInfo({ title, description });
    this.setAvatar({ avatar });
  }
}

