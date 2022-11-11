const express = require('express');
const { getSeries } = require('../controllers/tvController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', protect, getSeries);

module.exports = router;
