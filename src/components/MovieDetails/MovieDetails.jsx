import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from 'utils/api';
import styles from './MovieDetails.module.css';

//wyświetlenie informacji o wybranym filmie

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
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

  const fetchCastDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/movie/${movieId}/credits`, {
        params: {
          api_key: API_KEY,
        },
      });
      setCast(response.data.cast[0]);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

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

  const fetchMovieReviews = useCallback(async () => {
    try {
      const response = await axios.get(`/movie/${movieId}/reviews`, {
        params: {
          api_key: API_KEY,
        },
      });
      setReviews(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieDetails();
    fetchCastDetails();
    // fetchMovieCredits();
    fetchMovieReviews();
  }, [fetchMovieDetails, fetchCastDetails, fetchMovieReviews]);

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

      {isCastClicked && cast && (
        <div className={styles.cast}>
          <h2 className={styles.castTitle}>Cast</h2>
          <div className={styles.actor}>
            <img
              className={styles.actorImage}
              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
              alt={cast.name}
            />
            <div className={styles.actorDetails}>
              <h3 className={styles.actorName}>{cast.name}</h3>
              <p className={styles.actorCharacter}>{cast.character}</p>
            </div>
          </div>
        </div>
      )}

      {isReviewsClicked && reviews.length > 0 && (
        <div className={styles.reviews}>
          <h2 className={styles.reviewsTitle}>Reviews</h2>
          {reviews.map(review => (
            <div key={review.id} className={styles.reviewItem}>
              <h3 className={styles.reviewAuthor}>{review.author}</h3>
              <p className={styles.reviewContent}>{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
