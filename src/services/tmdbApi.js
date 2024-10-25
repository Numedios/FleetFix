import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY_TMDB;
const BASE_URL = 'https://api.themoviedb.org/3';


export const searchMovies = (query, page = 1) => {
  return axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      page: page
    }
  });
};


export const getPopularMovies = (page = 1) => {
  return axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      page: page,
    },
  });
};