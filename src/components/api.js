const config = {
  url: 'https://nomoreparties.co/v1/plus-cohort-20/',
  headers: '75975255-f606-4238-8a2f-4f7678e008f9',
}

const endpoint = {
  cards: 'cards/',
  cardLike: 'cards/likes/',
  users: 'users/me',
  avatar: 'users/me/avatar/'
}


function onResponse (res) {
  return res.ok
      ? res.json()
      : Promise.reject('Ошибка на стороне сервера');
}

function getCards() {
  return fetch(`${config.url + endpoint.cards}`,
  { method: "GET",
    headers: {
      authorization: config.headers
    }
  })
  .then(onResponse)
}

function addNewCard(name, link) {
  return fetch(`${config.url + endpoint.cards}`,
  { method: "POST",
    headers: {
      authorization: config.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link,
      })
  })
  .then(onResponse)
}

function removeCard(cadrId) {
  return fetch(`${config.url + endpoint.cards + cadrId}`,
  { method: "DELETE",
    headers: {
      authorization: config.headers,
      'Content-Type': 'application/json'
    }
  })
  .then(onResponse)
}

function addLikeCard(cadrId) {
  return fetch(`${config.url + endpoint.cardLike + cadrId}`,
  { method: "PUT",
    headers: {
      authorization: config.headers,
      'Content-Type': 'application/json'
    }
  })
  .then(onResponse)
}

function removeLikeCard(cadrId) {
  return fetch(`${config.url + endpoint.cardLike + cadrId}`,
  { method: "DELETE",
    headers: {
      authorization: config.headers,
      'Content-Type': 'application/json'
    }
  })
  .then(onResponse)
}

function getDataUser() {
  return fetch(`${config.url + endpoint.users}`,
  { method: "GET",
    headers: {
      authorization: config.headers
    }
  })
  .then(onResponse)
}

function  changeDataUser(name, about) {
  return fetch(`${config.url + endpoint.users}`,
  { method: 'PATCH',
    headers: {
    authorization: config.headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: name,
    about: about
    })
  })
  .then(onResponse)
}

function changeAvatar(link) {
  return fetch(`${config.url + endpoint.avatar}`,
  { method: 'PATCH',
    headers: {
    authorization: config.headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    avatar: link
    })
  })
  .then(onResponse)
}


export {getCards, getDataUser, changeDataUser, addNewCard, removeCard, addLikeCard, removeLikeCard, changeAvatar}
