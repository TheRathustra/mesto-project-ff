const apiSettings = {
  token: '6181dd13-c179-480c-8203-2aa7bbc59bd3',
  groupdId: 'wff-cohort-18'
}

const PATH = `https://nomoreparties.co/v1/${apiSettings.groupdId}/`;
const headers = ({
  "Content-Type": "application/json",
  authorization: `${apiSettings.token}`
});

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
}

function getProfile() {
  const settings = {
    method: 'GET',
    headers,
  };
  return fetch(PATH + "users/me", settings)
    .then(handleResponse); 
}

function patchProfile(name, about) {
  const settings = {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  };
  return fetch(PATH + "users/me", settings)
    .then(handleResponse);  
}

function patchAvatar(avatar) {
  const settings = {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: avatar
    })
  };
  return fetch(PATH + "users/me/avatar", settings)
    .then(handleResponse);  
}

function getCards() {
  const settings = {
    method: 'GET',
    headers,
  };
  return fetch(PATH + "cards", settings)
    .then(handleResponse); 
}

function postCard(name, link) {
  const settings = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  };
  return fetch(PATH + "cards", settings)
    .then(handleResponse); 
}

function likeCard(cardId, liked) {
  const settings = {
    method: liked ? 'PUT' : 'DELETE',
    headers
  };
  return fetch(PATH + `cards/likes/${cardId}`, settings)
    .then(handleResponse); 
}

function deleteCard(cardId) {
  const settings = {
    method: 'DELETE',
    headers
  };
  return fetch(PATH + `cards/${cardId}`, settings)
    .then(handleResponse); 
}

function checkUrl(url) {
  const settings = {
    method: 'HEAD'
  };
  let correctUrl = false;
  fetch(url, settings).then((response) => {
    correctUrl = response.ok;
  }).catch(() => correctUrl = false);
  return correctUrl; 
}

const makeCrudAPI = () => ({
  getProfile: () => getProfile(),
  patchProfile: (name, about) => patchProfile(name, about),
  patchAvatar: (avatar) => patchAvatar(avatar),
  getCards: () => getCards(),
  addCard: (name, link) => postCard(name, link),
  deleteCard: (cardId) => deleteCard(cardId),
  likeCard: (cardId, liked) => likeCard(cardId, liked),
  checkUrl: (url) => checkUrl(url),
});

export const crudAPI = makeCrudAPI(); 
