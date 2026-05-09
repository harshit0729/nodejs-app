const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'netflix_secret_key_123';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('watchlist');
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.userId);
    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.watchlist = user.watchlist.filter(id => id.toString() !== req.params.id);
    await user.save();
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;