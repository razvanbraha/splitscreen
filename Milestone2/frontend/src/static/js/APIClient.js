import HTTPClient from './HTTPClient.js';

const BASE_API_PATH = './api';

const handleAuthError = (error) => {
  if(error.status === 401) {
    console.log("No Authorization.");
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

/* 
const getCountyById = (id) => {
  return HTTPClient.get(`${BASE_API_PATH}/counties/${id}`)
  .catch(handleAuthError);
};

const getParks = () => {
  return HTTPClient.get(`${BASE_API_PATH}/parks`)
  .catch(handleAuthError);
};

const getParkById = (id) => {
  return HTTPClient.get(`${BASE_API_PATH}/parks/${id}`)
  .catch(handleAuthError);
};

const getParksByCountyId = (countyId) => {
  if(countyId == "all") {
    return getParks();
  }
  return HTTPClient.get(`${BASE_API_PATH}/counties/${countyId}/parks`)
  .catch(handleAuthError);
};

const getVisitedParks = () => {
  return HTTPClient.get(`${BASE_API_PATH}/users/current/parks`)
  .catch(handleAuthError);
};



*/

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

const getCurrentUser = () => {
  return HTTPClient.get(`${BASE_API_PATH}/users/current`)
  .catch(handleAuthError);
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

export default {
  getFeaturedGame,
  getRecentGames,
  getAnticipatedGames,
  logIn,
  logOut,
  getCurrentUser,
  createUser,
};
