import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY_TMDB;
const BASE_URL = 'https://api.themoviedb.org/3';

// Fonction pour rechercher des films
export const searchMovies = (query, page = 1) => {
  return axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      page: page
    }
  });
};

// Fonction pour obtenir les détails d'un film
export const getMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY
    }
  });
};

// Fonction pour obtenir une liste de films populaires
export const getPopularMovies = () => {
  return axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY
    }
  });
};
