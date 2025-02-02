// "token":"bef088e1-2ae1-4a7b-9925-57c1eac9ed1e"

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
      })
      .then( (res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`)
  })
}

updateUserInfo(data) {
return fetch(`${this._baseUrl}/users/me`, {
  method: "PATCH",
  headers: this._headers,
  body: JSON.stringify({
    name: data.title,
    about: data.description,
  })
})
}
  }