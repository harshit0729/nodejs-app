const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  posterUrl: { type: String, required: true },
  backdropUrl: { type: String },
  trailerUrl: { type: String },
  genre: [{ type: String }],
  releaseYear: { type: Number },
  rating: { type: Number, default: 0 },
  type: { type: String, enum: ['movie', 'series'], default: 'movie' },
  isFeatured: { type: Boolean, default: false },
  categories: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);