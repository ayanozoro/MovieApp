import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './popular/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Header/Navbar.jsx';
import FrontPage from './components/Front/FrontPage.jsx';
import Movies from './components/Alltype/allmovies.jsx';
// import Admin from './components/Admin/Admin.jsx';
// import Login from './components/Login/Login.jsx';
import Movie from './Movie-detail/Movie.jsx';
import Tv from '/Tv-detail/Tv.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const searchMovies = useCallback(async (query) => {
    if (query.trim() === '') {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=0fa2853e7c4d6c8f146aba861c5e4a06&query=${query}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => searchMovies(query), 300),
    [searchMovies]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  return (
    <Router>
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={debouncedSearch}
      />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/allmovies" element={<Movies />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route 
          path="/search" 
          element={<SearchResults movies={movies} isLoading={isLoading} />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
