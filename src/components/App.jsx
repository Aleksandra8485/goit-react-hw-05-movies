import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Movies from './Movies/Movies';
import SharedLayout from './SharedLayout/SharedLayout';

// import MovieDetails from './MovieDetails/MovieDetails';
// import Cast from './Cast/Cast';
// import Reviews from './Reviews/Reviews';

const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieDetails />
            </Suspense>
          }
        >
          <Route
            path="cast"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
