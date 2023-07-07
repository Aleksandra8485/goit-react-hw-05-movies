import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Outlet, Link } from 'react-router-dom';
import axios from 'axios';

//wyświetlenie informacji o wybranym filmie

function MovieDetails() {
  // const { id } = useParams();
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  // const [cast, setCast] = useState([]);
  // const [reviews, setReviews] = useState([]);

  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `/movies/get-movie-details?id=${movieId}`
      );
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        <Link to={`/movies/${movieId}`}>{movie.title}</Link>
      </h1>
      <p>{movie.overview}</p>

      <Outlet />
    </div>
  );
}

export default MovieDetails;
