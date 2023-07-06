import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const fetchMovieReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        `/movies/get-movie-reviews?id=${movieId}`
      );
      setReviews(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieReviews();
  }, [fetchMovieReviews]);

  //   useEffect(() => {
  //     const fetchMovieReviews = async () => {
  //       try {
  //         const response = await axios.get(
  //           `/movies/get-movie-reviews?id=${movieId}`
  //         );
  //         setReviews(response.data.results);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchMovieReviews();
  //   }, [movieId]);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map(review => (
        <div key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
