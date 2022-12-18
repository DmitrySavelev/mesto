export default class Api {
  constructor(authCode) {
    this._authCode = authCode;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error('ошибка');
  }

  getUser() {
    return fetch('https://nomoreparties.co/v1/cohort-54/users/me', {
      headers: {
        "content-type": "application/json",
        authorization: this._authCode,
      },
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-54/cards", {
      headers: {
        "content-type": "application/json",
        authorization: this._authCode,
      },
    })
      .then(this._handleResponse)
  }

  editProfile(infoData) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-54/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._authCode,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoData)
    })
      .then(this._handleResponse)

  }

  addNewCard(cardsData) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-54/cards", {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        authorization: this._authCode,
      },
      body: JSON.stringify(cardsData)
    })
      .then(this._handleResponse)
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-54/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authCode,
      },
    })
      .then(this._handleResponse)
  }

  addLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-54/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authCode,
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponse)
  }

  deleteLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-54/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authCode,
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponse)
  }

  updateAvatar(avatar) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-54/users/me/avatar", {
      method: 'PATCH',
      headers: {
        authorization: this._authCode,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._handleResponse)
  }

}


