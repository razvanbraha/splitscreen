import HTTPClient from './HTTPClient.js';

const BASE_API_PATH = './api';

const handleAuthError = (error) => {
  if(error.status === 401) {
    globalThis.location.href = '/';
  }
  throw error;
};

/* ------ Game Routes ------ */

const getFeaturedGame = () => {
  return HTTPClient.get(`${BASE_API_PATH}/games/featured`)
};

const getRecentGames = () => {
  return HTTPClient.get(`${BASE_API_PATH}/games/recent`)
};

const getAnticipatedGames = () => {
  return HTTPClient.get(`${BASE_API_PATH}/games/anticipated`)
};

const getGameById = (id) => {
  return HTTPClient.get(`${BASE_API_PATH}/games/id/${id}`)
};

const getGameByName = (name) => {
  return HTTPClient.get(`${BASE_API_PATH}/games/name/${name}`)
};

/* ------ Auth Routes ------ */

const logIn = (username, password) => {
  const data = {
    username: username,
    password: password
  };
  return HTTPClient.post(`${BASE_API_PATH}/login`, data);
};

const logOut = () => {
  return HTTPClient.post(`${BASE_API_PATH}/logout`, {});
};

/* ------ User Routes ------ */

const createUser = (firstName, lastName, username, password, innappropriateContent) => {
  const data = {
    firstname: firstName,
    lastname: lastName,
    username: username,
    password: password,
    innappropriateContent: innappropriateContent
  };
  return HTTPClient.post(`${BASE_API_PATH}/register`, data)
};

const getCurrentUser = () => {
  return HTTPClient.get(`${BASE_API_PATH}/users/current`)
  .catch(handleAuthError);
};

const getUser = (userId) => {
  return HTTPClient.get(`${BASE_API_PATH}/users/id/${userId}`)
  .catch(handleAuthError);
};

const searchUser = (username) => {
  return HTTPClient.get(`${BASE_API_PATH}/users/name/${username}`)
  .catch(handleAuthError);
};

const updateUser = (username) => {
  return HTTPClient.put(`${BASE_API_PATH}/users/update/${username}`)
  .catch(handleAuthError);
};

/* ------ Favorite Routes ------ */

const getUserFavoriteGames = (userId) => {
  return HTTPClient.get(`${BASE_API_PATH}/favorite/${userId}`)
  .catch(handleAuthError);
};

const addUserFavoriteGame = (gameId) => {
  return HTTPClient.post(`${BASE_API_PATH}/favorite/${gameId}`)
  .catch(handleAuthError);
}

const removeUserFavoriteGame = (gameId) => {
  return HTTPClient.delete(`${BASE_API_PATH}/favorite/${gameId}`)
  .catch(handleAuthError);
}

/* ------ Friend Routes ------ */

const confirmFriend = (friendId) => {
  return HTTPClient.get(`${BASE_API_PATH}/friends/confirm/${friendId}`)
  .catch(handleAuthError);  
}

const addFriend = (friendId) => {
  return HTTPClient.post(`${BASE_API_PATH}/friends/${friendId}`)
  .catch(handleAuthError);  
}

const removeFriend = (friendId) => {
  return HTTPClient.delete(`${BASE_API_PATH}/friends/${friendId}`)
  .catch(handleAuthError);  
}

const getFriends = () => {
  return HTTPClient.get(`${BASE_API_PATH}/friends/all`)
  .catch(handleAuthError);   
}

export default {
  getFeaturedGame,
  getRecentGames,
  getAnticipatedGames,
  getGameById,
  getGameByName,
  logIn,
  logOut,
  getCurrentUser,
  createUser,
  getUser,
  searchUser,
  updateUser,
  getUserFavoriteGames,
  addUserFavoriteGame,
  removeUserFavoriteGame,
  confirmFriend,
  addFriend,
  removeFriend,
  getFriends,
};
