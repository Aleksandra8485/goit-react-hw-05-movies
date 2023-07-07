import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '5aa46e061141b6aa48191a62115cc996';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

// // Ustawienie baseURL dla wszystkich zapytań Axios
// axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// // Ustawienie api_key jako domyślnego parametru
// axios.defaults.params = {
//   api_key: '5aa46e061141b6aa48191a62115cc996',
// };

//pobranie aktualnych filmów

const getTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Błąd podczas pobierania najpopularniejszych filmów:', error);
    throw error;
  }
};

// const fetchTrendingMovies = async () => {
//   try {
//     const response = await axios.get('/trending/movie/day');
//     return response.data.results;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export { getTrendingMovies };
