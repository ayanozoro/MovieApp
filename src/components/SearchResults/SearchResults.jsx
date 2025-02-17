import React from 'react';
import Cards from '../card/Card';
import './SearchResults.css';

const SearchResults = ({ movies, isLoading }) => {
  if (isLoading) {
    return (
      <div className="search-results">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">No movies found</div>
      </div>
    );
  }

  return (
    <div className="movie-wrapper">
        {movies.map((movie) => (
          <div key={movie.id} className="movie" onClick={() => handleMovieClick(movie.id)}>
            <div className="cardmovie" onClick={() => handleMovieClick(movie.id)}>
            <Cards movie={movie} />
            <div className="cardmovie__details">
            <h3 className="tvname">{movie ? movie.title : ""}</h3>

            <div className="quality">480p|720p|1080p</div>          
          </div>
       </div>

          </div>
          
        ))}
      </div>
  );
};

export default SearchResults;
