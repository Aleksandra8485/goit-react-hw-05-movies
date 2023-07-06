import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const fetchMovieCredits = useCallback(async () => {
    try {
      const response = await axios.get(
        `/movies/get-movie-credits?id=${movieId}`
      );
      setCast(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieCredits();
  }, [fetchMovieCredits]);

  return (
    <div>
      <h2>Cast</h2>
      {cast.map(person => (
        <div key={person.id}>
          <h3>{person.name}</h3>
          <p>{person.character}</p>
        </div>
      ))}
    </div>
  );
}

export default Cast;

//   useEffect(() => {
//     const fetchMovieCredits = async () => {
//       try {
//         const response = await axios.get(
//           `/movies/get-movie-credits?id=${movieId}`
//         );
//         setCast(response.data.cast);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchMovieCredits();
//   }, [movieId]);

//   return (
//     <div>
//       <h1>Cast</h1>
//       {cast.map(person => (
//         <div key={person.id}>
//           <h3>{person.name}</h3>
//           <p>{person.character}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Cast;
