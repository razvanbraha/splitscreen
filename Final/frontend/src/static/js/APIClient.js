import HTTPClient from './HTTPClient.js';

const BASE_API_PATH = './api';

const handleAuthError = (error) => {
  if(error.status === 401) {
    globalThis.location.href = '/';
  }
  throw error;
};

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
  return HTTPClient.get(`${BASE_API_PATH}/users/${userId}`)
  .catch(handleAuthError);
};

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
};
