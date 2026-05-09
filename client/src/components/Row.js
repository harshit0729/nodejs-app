import React from 'react';

function Row({ title, movies, onCardClick }) {
  return (
    <div className="row" id={title.toLowerCase().replace(/\s/g, '-')}>
      <h2 className="row-title">{title}</h2>
      <div className="row-scroll">
        {movies.map(movie => (
          <div key={movie._id} className="card" onClick={() => onCardClick(movie)}>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="card-image"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/180x270?text=No+Image'; }}
            />
            <div className="card-info">
              <div className="card-title">{movie.title}</div>
              <div className="card-meta">{movie.releaseYear} • {movie.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;