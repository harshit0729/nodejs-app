import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';

function Modal({ movie, onClose }) {
  const dispatch = useDispatch();
  const { watchlist } = useSelector(state => state.movies);
  const { token } = useSelector(state => state.auth);

  const isInWatchlist = watchlist.some(w => w._id === movie._id);

  const handleWatchlist = () => {
    if (!token) return;
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie._id));
    } else {
      dispatch(addToWatchlist(movie._id));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="modal-image"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x350?text=No+Image'; }}
        />
        <div className="modal-content">
          <h1 className="modal-title">{movie.title}</h1>
          <div className="modal-meta">
            <span>{movie.releaseYear}</span>
            <span>{movie.rating} ★</span>
            <span>{movie.type === 'series' ? 'TV Series' : 'Movie'}</span>
          </div>
          <p className="modal-description">{movie.description}</p>
          <div className="modal-buttons">
            <button className="hero-btn play">▶ Play</button>
            {token && (
              <button className="hero-btn info" onClick={handleWatchlist}>
                {isInWatchlist ? '✓ In My List' : '+ My List'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;