import axios from 'axios';

//Ustawienie baseURL dla wszystkich zapytań Axios
//Ustawienie api_key jako domyślnego parametru
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '5aa46e061141b6aa48191a62115cc996';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

//pobranie aktualnych filmów

const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`/trending/movie/day`);
    return response.data.results;
  } catch (error) {
    console.error('Błąd podczas pobierania najpopularniejszych filmów:', error);
    throw error;
  }
};

//pobranie informacji o filmie na podstawie jego ID
const getMovieDetails = async movieId => {
  try {
    const response = await axios.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania informacji o filmie:', error);
    throw error;
  }
};

export { getTrendingMovies, getMovieDetails };
