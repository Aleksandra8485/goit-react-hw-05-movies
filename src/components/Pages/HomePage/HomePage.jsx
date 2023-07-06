import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import API_KEY from 'utils/api';

//Ustawienie baseURL dla wszystkich zapytań Axios
axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie/popular';

//HomePage odpowiada za wyświetlanie najpopularniejszych filmów na stronie głównej

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  // const fetchTrendingMovies = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/trending/get-trending?api_key=${API_KEY}`
  //     );
  //     setMovies(response.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get('/trending/get-trending', {
        params: {
          api_key: '5aa46e061141b6aa48191a62115cc996',
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Trending Movies</h1>
      {movies.map(movie => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
