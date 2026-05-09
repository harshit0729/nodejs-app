const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const inMemoryDB = {
  users: [],
  movies: [
    { _id: '1', title: 'Stranger Things', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.', posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=450&fit=crop', backdropUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=600&fit=crop', genre: ['Sci-Fi', 'Horror'], releaseYear: 2016, rating: 8.7, type: 'series', isFeatured: true, categories: ['Trending', 'Popular'] },
    { _id: '2', title: 'Breaking Bad', description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.', posterUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=300&h=450&fit=crop', genre: ['Crime', 'Drama'], releaseYear: 2008, rating: 9.5, type: 'series', isFeatured: false, categories: ['Popular', 'Top Rated'] },
    { _id: '3', title: 'The Crown', description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.', posterUrl: 'https://images.unsplash.com/photo-1512070679635-2fe78240fd42?w=300&h=450&fit=crop', genre: ['Drama', 'History'], releaseYear: 2016, rating: 8.6, type: 'series', isFeatured: false, categories: ['Popular'] },
    { _id: '4', title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop', genre: ['Action', 'Sci-Fi'], releaseYear: 2010, rating: 8.8, type: 'movie', isFeatured: true, categories: ['Action', 'Sci-Fi'] },
    { _id: '5', title: 'Dark', description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.', posterUrl: 'https://images.unsplash.com/photo-1559583109-3e7968136c99?w=300&h=450&fit=crop', genre: ['Sci-Fi', 'Drama'], releaseYear: 2017, rating: 8.7, type: 'series', isFeatured: false, categories: ['Sci-Fi', 'Trending'] },
    { _id: '6', title: 'The Witcher', description: 'Geralt of Rivia, a mutated monster-hunter, struggles to find his place in a world where people often prove more wicked than beasts.', posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop', genre: ['Action', 'Fantasy'], releaseYear: 2019, rating: 8.2, type: 'series', isFeatured: false, categories: ['Popular', 'Action'] },
    { _id: '7', title: 'Squid Game', description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.', posterUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=300&h=450&fit=crop', genre: ['Thriller', 'Drama'], releaseYear: 2021, rating: 8.0, type: 'series', isFeatured: true, categories: ['Trending', 'Popular'] },
    { _id: '8', title: 'Money Heist', description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.', posterUrl: 'https://images.unsplash.com/photo-1553104839-0e7c5f9f8c7e?w=300&h=450&fit=crop', genre: ['Crime', 'Thriller'], releaseYear: 2017, rating: 8.3, type: 'series', isFeatured: false, categories: ['Popular', 'Top Rated'] },
    { _id: '9', title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop', genre: ['Adventure', 'Sci-Fi'], releaseYear: 2014, rating: 8.6, type: 'movie', isFeatured: false, categories: ['Sci-Fi', 'Top Rated'] },
    { _id: '10', title: 'The Walking Dead', description: 'Sheriff\'s deputy Rick Grimes awakens from a coma to find himself in a post-apocalyptic world dominated by flesh-eating zombies.', posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop', genre: ['Horror', 'Drama'], releaseYear: 2010, rating: 8.1, type: 'series', isFeatured: false, categories: ['Popular', 'Horror'] },
    { _id: '11', title: 'Oppenheimer', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', posterUrl: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=450&fit=crop', genre: ['Drama', 'Biography'], releaseYear: 2023, rating: 8.5, type: 'movie', isFeatured: true, categories: ['Trending', 'Popular'] },
    { _id: '12', title: 'Dune', description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.', posterUrl: 'https://images.unsplash.com/photo-1541364364176-91929d4ab3f3?w=300&h=450&fit=crop', genre: ['Sci-Fi', 'Adventure'], releaseYear: 2021, rating: 8.0, type: 'movie', isFeatured: false, categories: ['Sci-Fi', 'Action'] },
    { _id: '13', title: 'Wednesday', description: 'Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers.', posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&h=450&fit=crop', genre: ['Comedy', 'Fantasy'], releaseYear: 2022, rating: 8.1, type: 'series', isFeatured: false, categories: ['Trending', 'Comedy'] },
    { _id: '14', title: 'Game of Thrones', description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.', posterUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=300&h=450&fit=crop', genre: ['Drama', 'Fantasy'], releaseYear: 2011, rating: 9.2, type: 'series', isFeatured: false, categories: ['Top Rated', 'Popular'] },
    { _id: '15', title: 'Avatar', description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', posterUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=450&fit=crop', genre: ['Action', 'Adventure'], releaseYear: 2009, rating: 7.9, type: 'movie', isFeatured: false, categories: ['Action', 'Sci-Fi'] },
  ]
};

let userIdCounter = 1;
let tokenStore = new Map();

function generateToken(userId) {
  const token = 'token_' + Math.random().toString(36).substr(2) + Date.now();
  tokenStore.set(token, userId);
  return token;
}

function verifyToken(token) {
  return tokenStore.get(token);
}

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (inMemoryDB.users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = { _id: String(userIdCounter++), email, password, name, watchlist: [] };
  inMemoryDB.users.push(user);
  const token = generateToken(user._id);
  res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = inMemoryDB.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const token = generateToken(user._id);
  res.json({ token, user: { id: user._id, email: user.email, name: user.name, watchlist: user.watchlist } });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  const userId = verifyToken(token);
  if (!userId) return res.status(401).json({ message: 'Invalid token' });
  const user = inMemoryDB.users.find(u => u._id === userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user._id, email: user.email, name: user.name, watchlist: user.watchlist });
});

app.get('/api/movies', (req, res) => {
  const { category } = req.query;
  let movies = inMemoryDB.movies;
  if (category) {
    movies = movies.filter(m => m.categories?.includes(category));
  }
  res.json(movies);
});

app.get('/api/movies/featured', (req, res) => {
  const featured = inMemoryDB.movies.find(m => m.isFeatured);
  res.json(featured || null);
});

app.get('/api/movies/search', (req, res) => {
  const { q } = req.query;
  const movies = inMemoryDB.movies.filter(m => m.title.toLowerCase().includes(q.toLowerCase()));
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = inMemoryDB.movies.find(m => m._id === req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
});

app.get('/api/watchlist', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  const userId = verifyToken(token);
  if (!userId) return res.status(401).json({ message: 'Invalid token' });
  const user = inMemoryDB.users.find(u => u._id === userId);
  const watchlist = inMemoryDB.movies.filter(m => user.watchlist.includes(m._id));
  res.json(watchlist);
});

app.post('/api/watchlist', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  const userId = verifyToken(token);
  if (!userId) return res.status(401).json({ message: 'Invalid token' });
  const { movieId } = req.body;
  const user = inMemoryDB.users.find(u => u._id === userId);
  if (!user.watchlist.includes(movieId)) {
    user.watchlist.push(movieId);
  }
  const watchlist = inMemoryDB.movies.filter(m => user.watchlist.includes(m._id));
  res.json(watchlist);
});

app.delete('/api/watchlist/:id', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  const userId = verifyToken(token);
  if (!userId) return res.status(401).json({ message: 'Invalid token' });
  const user = inMemoryDB.users.find(u => u._id === userId);
  user.watchlist = user.watchlist.filter(id => id !== req.params.id);
  const watchlist = inMemoryDB.movies.filter(m => user.watchlist.includes(m._id));
  res.json(watchlist);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));