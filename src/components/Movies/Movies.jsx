import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from 'utils/api';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieClick = async movieId => {
    navigate(`/movies/${movieId}?api_key=${API_KEY}`);
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
    </div>
  );
};

export default Movies;

// const Movies = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [cast, setCast] = useState([]);
//   const [reviews, setReviews] = useState([]);

//   const navigate = useNavigate();

//   const handleInputChange = event => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `/search/search-movies?query=${searchTerm}`
//       );
//       setSearchResults(response.data.results);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchMovieDetails = async movieId => {
//     try {
//       const response = await axios.get(
//         `/movies/get-movie-details?id=${movieId}`
//       );
//       setMovieDetails(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchMovieCredits = async movieId => {
//     try {
//       const response = await axios.get(
//         `/movies/get-movie-credits?id=${movieId}`
//       );
//       setCast(response.data.cast);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchMovieReviews = async movieId => {
//     try {
//       const response = await axios.get(
//         `/movies/get-movie-reviews?id=${movieId}`
//       );
//       setReviews(response.data.results);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleMovieClick = async movieId => {
//     console.log('handleMovieClick called', movieId);
//     setSelectedMovie(movieId);
//     setMovieDetails(null);
//     setCast([]);
//     setReviews([]);

//     try {
//       await Promise.all([
//         fetchMovieDetails(movieId),
//         fetchMovieCredits(movieId),
//         fetchMovieReviews(movieId),
//       ]);
//       navigate(`/movies/${movieId}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Movies</h1>
//       <Link to="/">Go back</Link>

//       <div>
//         <input type="text" value={searchTerm} onChange={handleInputChange} />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       {searchResults.length > 0 ? (
//         <div>
//           <h2>Search Results</h2>
//           {searchResults.map(movie => (
//             <div key={movie.id}>
//               <h3>
//                 <Link
//                   to={`/movies/${movie.id}`}
//                   onClick={() => handleMovieClick(movie.id)}
//                 >
//                   {movie.title}
//                 </Link>
//               </h3>
//               <p>{movie.overview}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No search results</p>
//       )}

//       {selectedMovie && (
//         <div>
//           <h2>Selected Movie</h2>
//           {movieDetails ? (
//             <div>
//               <h3>Title: {movieDetails.title}</h3>
//               <p>Overview: {movieDetails.overview}</p>
//               <h3>Cast</h3>
//               {cast.map(person => (
//                 <div key={person.id}>
//                   <h4>{person.name}</h4>
//                   <p>{person.character}</p>
//                 </div>
//               ))}
//               <h3>Reviews</h3>
//               {reviews.map(review => (
//                 <div key={review.id}>
//                   <h4>{review.author}</h4>
//                   <p>{review.content}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>Loading movie details...</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Movies;
