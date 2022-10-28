const express = require('express');
const { getMovie, addMovie } = require('../controllers/movieController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', protect, getMovie);
router.post('/', protect, addMovie);

module.exports = router;
