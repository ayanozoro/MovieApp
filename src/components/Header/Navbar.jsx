import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [previousPath, setPreviousPath] = useState('/');

  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setPreviousPath(location.pathname);
    }
  }, [location]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      
      navigate(previousPath);
    } else {
      handleSearch(query);
      navigate('/search');
    }
  };

  return (
    <div className='main'>
      <header className="navbar">
        <nav className='navbar-brand'>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''} 
            style={{ textDecoration: 'none', color:'yellow', fontSize:'large' }}
          >
            <img src="./movie.png" alt="Logo" />
          </Link>
        </nav>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className='search-input'
          />
          
        </div>

        <nav className="navbar-links">
          <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Popular</Link>
          <Link to="/allmovies" className={location.pathname === '/allmovies' ? 'active' : ''}>Movies</Link>
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>TvShow</Link>
          <button className='button'>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
