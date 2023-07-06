import axios from 'axios';

// Ustawienie baseURL dla wszystkich zapytań Axios
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// Ustawienie api_key jako domyślnego parametru
axios.defaults.params = {
  api_key: '5aa46e061141b6aa48191a62115cc996',
};

const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { fetchTrendingMovies };

// const API_KEY = '5aa46e061141b6aa48191a62115cc996';

// export default API_KEY;
