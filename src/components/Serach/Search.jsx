import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import './search.css';
import { useNavigate } from 'react-router-dom';
import Cards from '../card/Card';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);
  const [type, setType] = useState('movie');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list`,
        {
          params: { api_key: '0fa2853e7c4d6c8f146aba861c5e4a06' },
        }
      );
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, [type]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${type}`,
        {
          params: {
            api_key: '0fa2853e7c4d6c8f146aba861c5e4a06',
            sort_by: sortBy,
            page: page,
            with_genres: selectedGenre,
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [sortBy, selectedGenre, page, type]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleSortChange = (event) => setSortBy(event.target.value);
  const handleGenreChange = (event) => setSelectedGenre(event.target.value);
  const handleTypeChange = (event) => setType(event.target.value);

  const handleSearchSubmit = async () => {
    setPage(1);
    const response = await axios.get(`https://api.themoviedb.org/3/search/${type}`, {
      params: { api_key: '0fa2853e7c4d6c8f146aba861c5e4a06', query: searchQuery },
    });
    setMovies(response.data.results);
  };

  const handleMovieClick = (movieId) => navigate(`/${type}/${movieId}`);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className='search-input'
        />
      </div>

      <div className="filters">
        <select value={type} onChange={handleTypeChange} className="filter-select">
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>

        <select value={sortBy} onChange={handleSortChange} className="filter-select">
          <option value="popularity.desc">Popularity Desc</option>
          <option value="popularity.asc">Popularity Asc</option>
          <option value="release_date.desc">Release Date Desc</option>
          <option value="release_date.asc">Release Date Asc</option>
        </select>

        <select value={selectedGenre} onChange={handleGenreChange} className="filter-select">
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div className="movie__list">
        <div className="list__cards">
          {movies.map((movie) => (
            <div key={movie.id} className="cardmovie" onClick={() => handleMovieClick(movie.id)}>
              <Cards movie={movie} />
              <div className="cardmovie__details">
                <h5 className="tvname">{movie?.original_name || movie?.title || 'Unknown Title'}</h5>
                <div className="quality">480p|720p|1080p</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Search;
