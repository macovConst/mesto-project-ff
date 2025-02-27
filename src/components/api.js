const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: '43917973-2feb-4cdf-bfd1-0dbc7bf82d22',
    'Content-Type': 'application/json'
  }
}

function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const getInfoUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => checkRes(res));
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => checkRes(res));
}

export const editUserProfile = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  })
    .then((res) => checkRes(res));
}

export const addNewCard = (newCardName, newCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink
    })
  })
    .then((res) => checkRes(res));
}

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => checkRes(res));
}

export const like = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => checkRes(res));
}

export const dislike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => checkRes(res));
}

export const changeAvatar = (urlNewAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: urlNewAvatar,
    })
  })
    .then((res) => checkRes(res));
}