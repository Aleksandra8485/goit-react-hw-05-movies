import axios from 'axios';

const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get('/trending/get-trending', {
      params: {
        api_key: '5aa46e061141b6aa48191a62115cc996',
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { fetchTrendingMovies };

// const API_KEY = '5aa46e061141b6aa48191a62115cc996';

// export default API_KEY;
