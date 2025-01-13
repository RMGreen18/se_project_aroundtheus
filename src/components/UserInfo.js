export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = description;
  }
}
