import React, { useEffect, useState } from 'react';
import { getTrendingMovies, getMovieDetails } from 'utils/api';

//HomePage odpowiada za wyświetlanie najpopularniejszych filmów na stronie głównej

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies);
    } catch (error) {
      console.log(error);
      setMovies([]);
    }
  };

  //wyświetlanie informacji o filmie
  const fetchMovieDetails = async movieId => {
    try {
      const movieDetails = await getMovieDetails(movieId);
      console.log(movieDetails);
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
