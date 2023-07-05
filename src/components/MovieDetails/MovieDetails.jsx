import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieReviews();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`/movies/get-movie-details?id=${id}`);
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieCredits = async () => {
    try {
      const response = await axios.get(`/movies/get-movie-credits?id=${id}`);
      setCast(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieReviews = async () => {
    try {
      const response = await axios.get(`/movies/get-movie-reviews?id=${id}`);
      setReviews(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <h2>Cast</h2>
      {cast.map(person => (
        <div key={person.id}>
          <h3>{person.name}</h3>
          <p>{person.character}</p>
        </div>
      ))}

      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieDetails;
