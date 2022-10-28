const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema(
	{
		target: {
			type: String,
			required: [true, 'Please add a name'],
		},
		type: {
			type: String,
			required: [true, 'Please add a type (tv / movie)'],
		},
		rating: {
			type: Number,
			required: [true, 'Please add a rating (0 - 5)'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Favorites', favoriteSchema);
