const express = require('express');
const { getActor } = require('../controllers/actorController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', protect, getActor);

module.exports = router;
