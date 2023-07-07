import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from 'utils/api';

//wyświetlenie informacji o wybranym filmie

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // const [cast, setCast] = useState([]);
  // const [reviews, setReviews] = useState([]);

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
    // fetchMovieCredits();
    // fetchMovieReviews();
  }, [fetchMovieDetails]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />

      <p>{movie.overview}</p>

      <Link to={`/movies/${movieId}/cast`}>Cast: View Cast</Link>
      <Link to={`/movies/${movieId}/reviews`}>Reviews: View Reviews</Link>

      <Outlet />
    </div>
  );
}

export default MovieDetails;
