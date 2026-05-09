import React from 'react';

function Hero({ movie }) {
  if (!movie) return null;

  return (
    <div className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})` }} />
      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-description">{movie.description?.substring(0, 200)}...</p>
        <div className="hero-buttons">
          <button className="hero-btn play">▶ Play</button>
              <button className="hero-btn info">ⓘ More Info</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;