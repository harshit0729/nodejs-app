import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { searchMovies } from '../redux/movieSlice';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const { user, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      dispatch(searchMovies(e.target.value));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo" onClick={() => navigate('/')}>NETFLIX</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#trending">TV Shows</a></li>
        <li><a href="#popular">Movies</a></li>
        <li><a href="#new">New & Popular</a></li>
      </ul>
      <div className="navbar-right">
        <input
          type="text"
          className="navbar-search"
          placeholder="Search movies..."
          value={search}
          onChange={handleSearch}
        />
        {token ? (
          <div className="navbar-profile" onClick={handleLogout} title="Logout">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        ) : (
          <Link to="/login" className="hero-btn play" style={{ padding: '8px 16px' }}>Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;