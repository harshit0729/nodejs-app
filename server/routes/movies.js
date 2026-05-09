const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
  try {
    const { category, type, limit = 20, skip = 0 } = req.query;
    let query = {};

    if (category) query.categories = category;
    if (type) query.type = type;

    const movies = await Movie.find(query).limit(parseInt(limit)).skip(parseInt(skip));
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const movies = await Movie.find({ isFeatured: true }).limit(1);
    res.json(movies[0] || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const movies = await Movie.find({ title: { $regex: q, $options: 'i' } }).limit(20);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    const sampleMovies = [
      { title: 'Stranger Things', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.', posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=450&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=600&fit=crop', genre: ['Sci-Fi', 'Horror'], releaseYear: 2016, rating: 8.7, type: 'series', isFeatured: true, categories: ['Trending', 'Popular'] },
      { title: 'Breaking Bad', description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.', posterUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=300&h=450&fit=crop', genre: ['Crime', 'Drama'], releaseYear: 2008, rating: 9.5, type: 'series', isFeatured: false, categories: ['Popular', 'Top Rated'] },
      { title: 'The Crown', description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.', posterUrl: 'https://images.unsplash.com/photo-1512070679635-2fe78240fd42?w=300&h=450&fit=crop', genre: ['Drama', 'History'], releaseYear: 2016, rating: 8.6, type: 'series', isFeatured: false, categories: ['Popular'] },
      { title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop', genre: ['Action', 'Sci-Fi'], releaseYear: 2010, rating: 8.8, type: 'movie', isFeatured: true, categories: ['Action', 'Sci-Fi'] },
      { title: 'Dark', description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.', posterUrl: 'https://images.unsplash.com/photo-1559583109-3e7968136c99?w=300&h=450&fit=crop', genre: ['Sci-Fi', 'Drama'], releaseYear: 2017, rating: 8.7, type: 'series', isFeatured: false, categories: ['Sci-Fi', 'Trending'] },
      { title: 'The Witcher', description: 'Geralt of Rivia, a mutated monster-hunter, struggles to find his place in a world where people often prove more wicked than beasts.', posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop', genre: ['Action', 'Fantasy'], releaseYear: 2019, rating: 8.2, type: 'series', isFeatured: false, categories: ['Popular', 'Action'] },
      { title: 'Squid Game', description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.', posterUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=300&h=450&fit=crop', genre: ['Thriller', 'Drama'], releaseYear: 2021, rating: 8.0, type: 'series', isFeatured: true, categories: ['Trending', 'Popular'] },
      { title: 'Money Heist', description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.', posterUrl: 'https://images.unsplash.com/photo-1553104839-0e7c5f9f8c7e?w=300&h=450&fit=crop', genre: ['Crime', 'Thriller'], releaseYear: 2017, rating: 8.3, type: 'series', isFeatured: false, categories: ['Popular', 'Top Rated'] },
      { title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop', genre: ['Adventure', 'Sci-Fi'], releaseYear: 2014, rating: 8.6, type: 'movie', isFeatured: false, categories: ['Sci-Fi', 'Top Rated'] },
      { title: 'The Walking Dead', description: 'Sheriff\'s deputy Rick Grimes awakens from a coma to find himself in a post-apocalyptic world dominated by flesh-eating zombies.', posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop', genre: ['Horror', 'Drama'], releaseYear: 2010, rating: 8.1, type: 'series', isFeatured: false, categories: ['Popular', 'Horror'] },
      { title: 'Oppenheimer', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', posterUrl: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=450&fit=crop', genre: ['Drama', 'Biography'], releaseYear: 2023, rating: 8.5, type: 'movie', isFeatured: true, categories: ['Trending', 'Popular'] },
      { title: 'Dune', description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.', posterUrl: 'https://images.unsplash.com/photo-1541364364176-91929d4ab3f3?w=300&h=450&fit=crop', genre: ['Sci-Fi', 'Adventure'], releaseYear: 2021, rating: 8.0, type: 'movie', isFeatured: false, categories: ['Sci-Fi', 'Action'] },
      { title: 'Wednesday', description: 'Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers.', posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&h=450&fit=crop', genre: ['Comedy', 'Fantasy'], releaseYear: 2022, rating: 8.1, type: 'series', isFeatured: false, categories: ['Trending', 'Comedy'] },
      { title: 'Game of Thrones', description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.', posterUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=300&h=450&fit=crop', genre: ['Drama', 'Fantasy'], releaseYear: 2011, rating: 9.2, type: 'series', isFeatured: false, categories: ['Top Rated', 'Popular'] },
      { title: 'Avatar', description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', posterUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=450&fit=crop', genre: ['Action', 'Adventure'], releaseYear: 2009, rating: 7.9, type: 'movie', isFeatured: false, categories: ['Action', 'Sci-Fi'] },
    ];

    await Movie.deleteMany({});
    await Movie.insertMany(sampleMovies);
    res.json({ message: 'Database seeded successfully', count: sampleMovies.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;