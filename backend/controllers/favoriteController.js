const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Favorites = require('../models/favoriteModel');

const getRating = asyncHandler(async (req, res) => {
	const { target, type } = req.body;
	const _id = req.user.id;

	const rating = await Favorites.findOne({ target, type, user: _id });

	if (rating) {
		res.status(200).json({
			rating: favoriteExists.rating,
		});
	} else {
		res.status(400);
		throw new Error('Invalid data');
	}
});

const createRating = asyncHandler(async (req, res) => {
	const { target, type, rating } = req.body;
	const _id = req.user.id;

	if (!target || !type || !rating) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	const favoriteExists = await Favorites.findOneAndUpdate(
		{ user: _id, target, type },
		{ rating: rating }
	);

	if (favoriteExists) {
		res.status(201).json({
			target: favoriteExists.target,
			type: favoriteExists.type,
			rating: favoriteExists.rating,
		});
	} else {
		const newFavorite = await Favorites.create({
			target,
			type,
			rating,
			user: _id,
		});

		if (newFavorite) {
			res.status(201).json({
				target: newFavorite.target,
				type: newFavorite.type,
				rating: newFavorite.rating,
			});
		} else {
			res.status(400);
			throw new Error('Invalid data');
		}
	}
});

module.exports = {
	getRating,
	createRating,
};
