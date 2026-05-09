import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchFeatured, fetchWatchlist } from '../redux/movieSlice';
import Hero from '../components/Hero';
import Row from '../components/Row';
import Modal from '../components/Modal';
import Footer from '../components/Footer';

function Home() {
  const dispatch = useDispatch();
  const { movies, featured } = useSelector(state => state.movies);
  const { token } = useSelector(state => state.auth);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchFeatured());
    dispatch(fetchMovies());
    if (token) {
      dispatch(fetchWatchlist());
    }
  }, [dispatch, token]);

  const categories = ['Trending', 'Popular', 'Action', 'Sci-Fi', 'Drama', 'Comedy'];

  const getMoviesByCategory = (category) => {
    if (category === 'Trending') {
      return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
    }
    return movies.filter(m => m.categories?.includes(category)).slice(0, 10);
  };

  return (
    <>
      <Hero movie={featured} />
      {categories.map(cat => {
        const catMovies = getMoviesByCategory(cat);
        if (catMovies.length === 0) return null;
        return <Row key={cat} title={cat} movies={catMovies} onCardClick={setSelectedMovie} />;
      })}
      {selectedMovie && <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      <Footer />
    </>
  );
}

export default Home;