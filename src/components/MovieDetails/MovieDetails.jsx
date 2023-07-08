import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from 'utils/api';
import styles from './MovieDetails.module.css';
// import Cast from './Cast/Cast';
// import Reviews from './Reviews/Reviews';

//wyświetlenie informacji o wybranym filmie

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // const [cast, setCast] = useState([]);
  // const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const isCastClicked = location.pathname.includes('/cast');
  const isReviewsClicked = location.pathname.includes('/reviews');

  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  // const fetchCastDetails = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`/movie/${movieId}/credits`, {
  //       params: {
  //         api_key: API_KEY,
  //       },
  //     });
  //     setCast(response.data.cast[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [movieId]);

  // const fetchMovieCredits = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`/movie/${movieId}/credits`, {
  //       params: {
  //         api_key: API_KEY,
  //       },
  //     });
  //     setCast(response.data.cast);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [movieId]);

  // const fetchMovieReviews = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`/movie/${movieId}/reviews`, {
  //       params: {
  //         api_key: API_KEY,
  //       },
  //     });
  //     setReviews(response.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [movieId]);

  useEffect(() => {
    fetchMovieDetails();
    // fetchCastDetails();
    // fetchMovieCredits();
    // fetchMovieReviews();
  }, [fetchMovieDetails]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetails}>
      <div className={styles.posterContainer}>
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>

          <div className={styles.links}>
            <Link
              to={`/movies/${movieId}/cast`}
              className={isCastClicked ? styles.activeLink : ''}
            >
              Cast: View Cast
            </Link>
            <Link
              to={`/movies/${movieId}/reviews`}
              className={isReviewsClicked ? styles.activeLink : ''}
            >
              Reviews: View Reviews
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetails;
