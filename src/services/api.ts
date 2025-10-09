import axios from "axios";

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
      "Content-type": "application/json"
  }
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default api;