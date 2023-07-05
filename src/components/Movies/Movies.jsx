import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/search/search-movies?query=${searchTerm}`
      );
      setSearchResults(response.data.results);
      setSelectedMovie(null);
      setMovieDetails(null);
      setCast([]);
      setReviews([]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMovieDetails = async movieId => {
    try {
      const response = await axios.get(
        `/movies/get-movie-details?id=${movieId}`
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieCredits = async movieId => {
    try {
      const response = await axios.get(
        `/movies/get-movie-credits?id=${movieId}`
      );
      setCast(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieReviews = async movieId => {
    try {
      const response = await axios.get(
        `/movies/get-movie-reviews?id=${movieId}`
      );
      setReviews(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieClick = async movieId => {
    setSelectedMovie(movieId);
    setMovieDetails(null);
    setCast([]);
    setReviews([]);

    try {
      await Promise.all([
        fetchMovieDetails(movieId),
        fetchMovieCredits(movieId),
        fetchMovieReviews(movieId),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <Link to="/">Go back</Link>

      <div>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 ? (
        <div>
          <h2>Search Results</h2>
          {searchResults.map(movie => (
            <div key={movie.id}>
              <h3>
                <Link
                  to={`/movies/${movie.id}`}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  {movie.title}
                </Link>
              </h3>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No search results</p>
      )}
      {selectedMovie && (
        <div>
          {movieDetails ? (
            <div>
              <h2>{movieDetails.title}</h2>
              <p>{movieDetails.overview}</p>

              <h3>Cast</h3>
              {cast.map(person => (
                <div key={person.id}>
                  <h4>{person.name}</h4>
                  <p>{person.character}</p>
                </div>
              ))}

              <h3>Reviews</h3>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id}>
                    <h4>{review.author}</h4>
                    <p>{review.content}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          ) : (
            <p>Loading movie details...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
