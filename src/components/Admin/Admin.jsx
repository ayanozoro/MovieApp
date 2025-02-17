import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import './top.css';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import Cards from '../card/Card';

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1); // New state for pagination
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/tv/list',
        {
          params: { api_key: process.env.apikey },
        }
      );
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/tv',
        {
          params: {
            api_key: '0fa2853e7c4d6c8f146aba861c5e4a06',
            sort_by: sortBy,
            page: page,  // Use page state
            with_genres: selectedGenre,
            query: searchQuery,
          },
        }
      );
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [searchQuery, sortBy, selectedGenre, page]); // Add page to dependencies

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleSortChange = (event) => setSortBy(event.target.value);
  const handleGenreChange = (event) => setSelectedGenre(event.target.value);

  const handleSearchSubmit = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/search/tv', {
      params: { api_key: '0fa2853e7c4d6c8f146aba861c5e4a06', query: searchQuery },
    });
    setMovies(response.data.results);
  };

  const handleMovieClick = (movieId) => navigate(`/tv/${movieId}`);

  // Pagination Handlers
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <div>
      <h1 style={{textAlign:'left', color:'red'}}>Tv Show</h1>

      {/* Movies List */}
      <div className="movie-wrapper">
        {movies.map((movie) => (
          <div key={movie.id} className="movie" onClick={() => handleMovieClick(movie.id)}>
            <div className="cardmovie" onClick={() => handleMovieClick(movie.id)}>
            <Cards movie={movie} />
            <div className="cardmovie__details">
            <h5 className="tvname">{movie ? movie.original_name : ""}</h5>
            <div className="quality">480p|720p|1080p</div>          
          </div>
       </div>

          </div>
          
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1} className="pagination-button">
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Admin;

