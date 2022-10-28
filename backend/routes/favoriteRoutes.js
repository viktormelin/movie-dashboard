const express = require('express');
const {
	createRating,
	getRating,
} = require('../controllers/favoriteController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getRating);
router.post('/add', protect, createRating);

module.exports = router;
