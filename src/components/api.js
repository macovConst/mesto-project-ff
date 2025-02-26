// Токен: 43917973-2feb-4cdf-bfd1-0dbc7bf82d22
// Идентификатор группы: wff-cohort-31

// return fetch('https://nomoreparties.co/v1/wff-cohort-31/cards', {
//   headers: {
//     authorization: '43917973-2feb-4cdf-bfd1-0dbc7bf82d22'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 

// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     })
//     .catch((err) => {
//       console.log(err); // выводим ошибку в консоль
//     })
// } 

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: '43917973-2feb-4cdf-bfd1-0dbc7bf82d22',
    'Content-Type': 'application/json'
  }
}

export const getInfoUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const like = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const dislike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const changeAvatar = (urlNewAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: urlNewAvatar,
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}