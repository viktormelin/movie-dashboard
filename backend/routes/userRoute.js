const express = require('express');
const {
	resetPassword,
	registerUser,
	loginUser,
	getUser,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.post('/resetpassword', resetPassword);
router.post('/login', loginUser);
router.get('/me', protect, getUser);

module.exports = router;
