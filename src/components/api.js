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







const checksAnswer = res => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка: ${res.status}`);
};

// Получает от сервера данные карточек.
/**
 * Структура массива карточек, получаемого от сервера:
 * [
 *   {
 *     "likes": [], // массив пользователей, лайкнувших карточку
 *     "_id": "5d1f0611d321eb4bdcd707dd",
 *     "name": "Байкал",
 *     "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
 *     "owner": {
 *       "name": "Jacques Cousteau",
 *       "about": "Sailor, researcher",
 *       "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
 *       "_id": "ef5f7423f7f5e22bef4ad607",
 *       "cohort": "local"
 *     },
 *     "createdAt": "2019-07-05T08:10:57.741Z"
 *   },
 *   ... и т.д.
 */
const getCards = param => {
  return fetch(`${param.baseUrl}cards/`, {
    headers: param.headers
  })
    .then(res => checksAnswer(res));
};

// Получает от сервера данные пользователя.
/**
 * Структура объекта пользователя, получаемого от сервера:
 * {
 *   "name": "Jacques Cousteau",
 *   "about": "Sailor, researcher",
 *   "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
 *   "_id": "e20537ed11237f86bbb20ccb",
 *   "cohort": "cohort0"
 * }
 */
const getUser = param => {
  return fetch(`${param.baseUrl}users/me/`, {
    headers: param.headers
  })
    .then(res => checksAnswer(res));
};

// Отправляет на сервер информацию о пользователе (аватар отправляется отдельно).
const setUserInfo = (param, name, about) => {
  return fetch(`${param.baseUrl}users/me/`, {
    method: 'PATCH',
    headers: param.headers,
    body: JSON.stringify({name, about})
  })
    .then(res => checksAnswer(res));
};

// Отправляет на сервер аватар пользователя (инфо отправляется отдельно).
const setUserAvatar = (param, avatar) => {
  return fetch(`${param.baseUrl}users/me/avatar/`, {
    method: 'PATCH',
    headers: param.headers,
    body: JSON.stringify({avatar})
  })
    .then(res => checksAnswer(res));
};

// Отправляет на сервер новую карточку.
const setNewCard = (param, name, link) => {
  return fetch(`${param.baseUrl}cards/`, {
    method: 'POST',
    headers: param.headers,
    body: JSON.stringify({name, link})
  })
    .then(res => checksAnswer(res));
};

// Удаляет с сервера карточку с принятым id.
const delCard = (param, idCard) => {
  return fetch(`${param.baseUrl}cards/${idCard}/`, {
    method: 'DELETE',
    headers: param.headers
  })
    .then(res => checksAnswer(res));
};

// Ставит лайк карточке с принятым id.
const setLike = (param, idCard) => {
  return fetch(`${param.baseUrl}cards/likes/${idCard}/`, {
    method: 'PUT',
    headers: param.headers
  })
    .then(res => checksAnswer(res));
};

// Снимает лайк карточке с принятым id.
const delLike = (param, idCard) => {
  return fetch(`${param.baseUrl}/cards/likes/${idCard}/`, {
    method: 'DELETE',
    headers: param.headers
  })
    .then(res => checksAnswer(res));
};


export {getCards, getUser, setUserInfo, setNewCard, delCard, setLike, delLike, setUserAvatar};
