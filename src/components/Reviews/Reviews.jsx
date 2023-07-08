import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { getMovieReviews } from 'utils/api';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const fetchMovieReviews = useCallback(async () => {
    try {
      const reviews = await getMovieReviews(movieId);
      setReviews(reviews);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieReviews();
  }, [fetchMovieReviews]);

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
