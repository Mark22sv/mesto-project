export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl,
      this._headers = headers
  }

  // Получает от сервера данные карточек.
  getCards() {
    return fetch(`${this._baseUrl}cards/`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checksAnswer);
  };

  // Получает от сервера данные пользователя.
  getUser() {
    return fetch(`${this._baseUrl}users/me/`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checksAnswer);
  };

  // Отправляет на сервер информацию о пользователе (аватар отправляется отдельно).
  setUserInfo(formInfo) {
    return fetch(`${this._baseUrl}users/me/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(formInfo)
    })
      .then(this._checksAnswer);
  };

  // Отправляет на сервер аватар пользователя (инфо отправляется отдельно).
  setUserAvatar(formInfo) {
    return fetch(`${this._baseUrl}users/me/avatar/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(formInfo)
    })
      .then(this._checksAnswer);
  };

  // Отправляет на сервер новую карточку.
  setNewCard(formInfo) {
    return fetch(`${this._baseUrl}cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(formInfo)
    })
      .then(this._checksAnswer);
  };

  // Удаляет с сервера карточку с принятым id.
  delCard(idCard) {
    return fetch(`${this._baseUrl}cards/${idCard}/`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checksAnswer);
  };

  // Ставит лайк карточке с принятым id.
  setLike(idCard) {
    return fetch(`${this._baseUrl}cards/likes/${idCard}/`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checksAnswer);
  };

  // Снимает лайк карточке с принятым id.
  delLike(idCard) {
    return fetch(`${this._baseUrl}/cards/likes/${idCard}/`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checksAnswer);
  };

  _checksAnswer(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`);
  };
}


