import React, { useEffect, useState } from 'react';
import './Front.css';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';

const FrontPage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/movie/week?api_key=0fa2853e7c4d6c8f146aba861c5e4a06'
        );
        const data = await response.json();
        setTrendingMovies(data.results.slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      }
    };

    const fetchTrendingTVShows = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/tv/week?api_key=0fa2853e7c4d6c8f146aba861c5e4a06'
        );
        const data = await response.json();
        setTrendingTVShows(data.results.slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch trending TV shows:', error);
      }
    };

    fetchTrendingMovies();
    fetchTrendingTVShows();
  }, []);

  const handleClick = (movieId) => { navigate(`/movie/${movieId}`)};
  const handleClickshow = (showId) => { navigate(`/tv/${showId}`);
  }
  return (
    <div className='front-page'>
      <motion.div
        className='front'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>
          Welcome to <span className='sp'>Movie Web</span>
        </h1>
        <input type='text' className='frontSearch' placeholder='Search for a movie' />
        <button className='btn'>Get Started</button>
        <p className='para'>Your one-stop destination for all movies!</p>
      </motion.div>

      <motion.div
        className='trending-section'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h2 className='trending-title'>🔥 Trending Movies</h2>
        <div className='trending'>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => handleClick(movie.id)}>
              <img className='tend-img' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
              <p className='movie-title'>{movie.title}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className='trending-section'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h2 className='trending-title'>🔥 Trending TV Shows</h2>
        <div className='trending'>
          {trendingTVShows.map((show) => (
            <div key={show.id} className="movie-card" onClick={() => handleClickshow(show.id)}>
              <img className='tend-img' src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt={show.name} />
              <p className='movie-title'>{show.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FrontPage;
