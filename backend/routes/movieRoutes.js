const express = require('express');
const {
	getMovie,
	addMovie,
	searchMovies,
} = require('../controllers/movieController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', protect, getMovie);
router.post('/', protect, addMovie);
router.get('/search/:id', protect, searchMovies);

module.exports = router;
