const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Favorites = require('../models/favoriteModel');
const Movies = require('../models/movieModel');

const getMovie = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (id) {
		const movie = await Movies.findOne({ id });
		res.status(200).json(movie);
	} else {
		res.status(400);
		throw new Error('Invalid data');
	}
});

const addMovie = asyncHandler(async (req, res) => {
	const {
		id,
		title,
		originalTitle,
		fullTitle,
		type,
		year,
		image,
		releaseDate,
		runtimeMins,
		runtimeStr,
		plot,
		awards,
		directors,
		directorList,
		writers,
		writerList,
		stars,
		starList,
		actorList,
		fullCast,
		genres,
		genreList,
		companies,
		companyList,
		countries,
		countryList,
		languages,
		languageList,
		contentRating,
		imDbRating,
		imDbRatingVotes,
		metacriticRating,
		ratings,
		wikipedia,
		posters,
		images,
		trailer,
		boxOffice,
		tagline,
		keywords,
		keywordList,
		similars,
		tvSeriesInfo,
		tvEpisodeInfo,
		errorMessage,
	} = req.body.data;

	if (!id || !title) {
		res.status(400);
		throw new Error('No id or title specified');
	}

	const movieExists = await Movies.findOne({ id });

	if (movieExists) {
		res.status(200).json(movieExists);
	} else {
		const movie = await Movies.create({
			id,
			title,
			originalTitle,
			fullTitle,
			type,
			year,
			image,
			releaseDate,
			runtimeMins,
			runtimeStr,
			plot,
			awards,
			directors,
			directorList,
			writers,
			writerList,
			stars,
			starList,
			actorList,
			fullCast,
			genres,
			genreList,
			companies,
			companyList,
			countries,
			countryList,
			languages,
			languageList,
			contentRating,
			imDbRating,
			imDbRatingVotes,
			metacriticRating,
			ratings,
			wikipedia,
			posters,
			images,
			trailer,
			boxOffice,
			tagline,
			keywords,
			keywordList,
			similars,
			tvSeriesInfo,
			tvEpisodeInfo,
			errorMessage,
		});

		res.status(201).json(movie);
	}
});

module.exports = {
	getMovie,
	addMovie,
};
