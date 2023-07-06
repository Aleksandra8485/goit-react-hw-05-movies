import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import axios from 'axios';

//wyświetlenie informacji o wybranym filmie

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  // const [cast, setCast] = useState([]);
  // const [reviews, setReviews] = useState([]);

  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/movies/get-movie-details?id=${id}`);
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // const fetchMovieCredits = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`/movies/get-movie-credits?id=${id}`);
  //     setCast(response.data.cast);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [id]);

  // const fetchMovieReviews = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`/movies/get-movie-reviews?id=${id}`);
  //     setReviews(response.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   fetchMovieCredits();
  //   fetchMovieDetails();
  //   fetchMovieReviews();
  // }, [fetchMovieCredits, fetchMovieDetails, fetchMovieReviews]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <Outlet />
    </div>
  );
}

export default MovieDetails;
