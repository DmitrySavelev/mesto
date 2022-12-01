export default class Api {
  constructor(apiUrl, authCode) {
    this._apiUrl = apiUrl;
    this._authCode = authCode;
  }

  getAllCards() {
    return fetch(this._apiUrl, {
      headers: {
        "content-type": "application/json",
        authorization: this._authCode,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-52/users/me ', {
      headers: {
        "content-type": "application/json",
        authorization: this._authCode,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
  }

  editProfile() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._authCode,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie ',
        about: 'Chemist'
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })

  }



}


