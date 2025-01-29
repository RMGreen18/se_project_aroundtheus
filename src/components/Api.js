// "token":"bef088e1-2ae1-4a7b-9925-57c1eac9ed1e"

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  getUserInfo() {

  }

  getInitialCards () {
return fetch(`${this._baseUrl}/cards`, {
  method: "GET",
  headers: this._headers
})
.then((res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
})
.then((data) => {
console.log(data)
})
  }
}

const api = new Api( {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bef088e1-2ae1-4a7b-9925-57c1eac9ed1e",
    "Content-Type": "application/json"
  }
});