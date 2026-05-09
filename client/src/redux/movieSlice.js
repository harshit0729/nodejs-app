import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = '/api/movies';

export const fetchMovies = createAsyncThunk('movies/fetchAll', async (category) => {
  const res = await fetch(`${API_URL}${category ? `?category=${category}` : ''}`);
  return await res.json();
});

export const fetchFeatured = createAsyncThunk('movies/fetchFeatured', async () => {
  const res = await fetch(`${API_URL}/featured`);
  return await res.json();
});

export const searchMovies = createAsyncThunk('movies/search', async (query) => {
  const res = await fetch(`${API_URL}/search?q=${query}`);
  return await res.json();
});

export const fetchWatchlist = createAsyncThunk('movies/watchlist', async (_, { getState }) => {
  const token = getState().auth.token;
  const res = await fetch('/api/watchlist', { headers: { Authorization: `Bearer ${token}` } });
  return await res.json();
});

export const addToWatchlist = createAsyncThunk('movies/addWatchlist', async (movieId, { getState }) => {
  const token = getState().auth.token;
  const res = await fetch('/api/watchlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ movieId })
  });
  return await res.json();
});

export const removeFromWatchlist = createAsyncThunk('movies/removeWatchlist', async (movieId, { getState }) => {
  const token = getState().auth.token;
  const res = await fetch(`/api/watchlist/${movieId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: { movies: [], featured: null, watchlist: [], searchResults: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => { state.movies = action.payload; })
      .addCase(fetchFeatured.fulfilled, (state, action) => { state.featured = action.payload; })
      .addCase(searchMovies.fulfilled, (state, action) => { state.searchResults = action.payload; })
      .addCase(fetchWatchlist.fulfilled, (state, action) => { state.watchlist = action.payload; })
      .addCase(addToWatchlist.fulfilled, (state, action) => { state.watchlist = action.payload; })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => { state.watchlist = action.payload; });
  }
});

export default movieSlice.reducer;