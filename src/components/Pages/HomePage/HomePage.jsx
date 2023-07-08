import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from 'utils/api';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      {movies.map(movie => (
        <div key={movie.id} className={styles.movie}>
          <h2 className={styles.movieTitle}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </h2>
          {movie.overview && (
            <p className={styles.movieOverview}>{movie.overview}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
