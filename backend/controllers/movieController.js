const axios = require('axios');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Favorites = require('../models/favoriteModel');
const Movies = require('../models/movieModel');
const { response } = require('express');

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		authorization: `Bearer ${process.env.API_TOKEN}`,
	},
});

const searchMovies = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (id) {
		const response = await axiosInstance.get(`search/multi?query=${id}`);

		// const response = await axios.get(
		// 	`https://imdb-api.com/en/API/AdvancedSearch/${process.env.API_TOKEN}/?title=${id}`
		// );

		if (response.status === 200) {
			res.status(200).send(response.data.results);
		} else {
			res.status(400);
			throw new Error(response.data.errorMessage);
		}
	} else {
		res.status(400);
		throw new Error('Invalid data');
	}
});

const getMovie = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (id) {
		const details = await axiosInstance.get(`movie/${id}`);

		if (details.status != 200) {
			res.status(400);
			throw new Error(details.data.status_message);
		}

		const credits = await axiosInstance.get(`movie/${id}/credits`);

		if (credits.status != 200) {
			res.status(400);
			throw new Error(credits.data.status_message);
		}

		const similar = await axiosInstance.get(`movie/${id}/similar`);

		if (similar.status != 200) {
			res.status(400);
			throw new Error(similar.data.status_message);
		}

		const videos = await axiosInstance.get(`movie/${id}/videos`);

		if (videos.status != 200) {
			res.status(400);
			throw new Error(videos.data.status_message);
		}

		const response = {
			details: details.data,
			credits: credits.data,
			similar: similar.data,
			videos: videos.data,
		};

		res.status(200).send(response);
	} else {
		res.status(400);
		throw new Error('Invalid ID provided');
	}
	// if (id) {
	// 	const movie = await Movies.findOne({ id });
	// 	if (movie) {
	// 		res.status(200).json(movie);
	// 	} else {
	// 		const response = await axios.get(
	// 			`https://imdb-api.com/en/API/Title/${process.env.API_TOKEN}/${id}`
	// 		);
	// 		console.log('Movie Response', response);
	// 		if (
	// 			response.data.errorMessage === '' ||
	// 			response.data.errorMessage === null
	// 		) {
	// 			if (response.data.type === 'Movie') {
	// 				addMovie(response.data);
	// 				res.status(200).send(response.data);
	// 			} else if (response.data.type === 'TVSeries') {
	// 				console.log('Running TVSeries thing');
	// 				response.data.seasonInfo = {};
	// 				let seasonInfo = [];
	// 				const length = response.data.tvSeriesInfo.seasons.length + 1;
	// 				for (let i = 1; i < length; i++) {
	// 					const response = await axios.get(
	// 						`https://imdb-api.com/en/API/SeasonEpisodes/${process.env.API_TOKEN}/${id}/${i}`
	// 					);
	// 					console.log('TVSeries Season Response', response);
	// 					if (
	// 						response.data.errorMessage === '' ||
	// 						response.data.errorMessage === null
	// 					) {
	// 						seasonInfo.push(response.data);
	// 					}
	// 				}
	// 				console.log('TVSeries Complete', response.data);
	// 				response.data.seasonInfo = seasonInfo;
	// 				addMovie(response.data);
	// 				res.status(200).send(response.data);
	// 			}
	// 		} else {
	// 			res.status(400);
	// 			throw new Error(response.data.errorMessage);
	// 		}
	// 	}
	// } else {
	// 	res.status(400);
	// 	throw new Error('Invalid data');
	// }
});

const addMovie = async (movie) => {
	// const {
	// 	id,
	// 	title,
	// 	originalTitle,
	// 	fullTitle,
	// 	type,
	// 	year,
	// 	image,
	// 	releaseDate,
	// 	runtimeMins,
	// 	runtimeStr,
	// 	plot,
	// 	awards,
	// 	directors,
	// 	directorList,
	// 	writers,
	// 	writerList,
	// 	stars,
	// 	starList,
	// 	actorList,
	// 	fullCast,
	// 	genres,
	// 	genreList,
	// 	companies,
	// 	companyList,
	// 	countries,
	// 	countryList,
	// 	languages,
	// 	languageList,
	// 	contentRating,
	// 	imDbRating,
	// 	imDbRatingVotes,
	// 	metacriticRating,
	// 	ratings,
	// 	wikipedia,
	// 	posters,
	// 	images,
	// 	trailer,
	// 	boxOffice,
	// 	tagline,
	// 	keywords,
	// 	keywordList,
	// 	similars,
	// 	tvSeriesInfo,
	// 	tvEpisodeInfo,
	// 	errorMessage,
	// } = movie;
	// if (!id || !title) {
	// 	throw new Error('No id or title specified');
	// }
	// const movieExists = await Movies.findOne({ id });
	// if (movieExists) {
	// 	throw new Error('Movie already exists');
	// } else {
	// 	const movie = await Movies.create({
	// 		id,
	// 		title,
	// 		originalTitle,
	// 		fullTitle,
	// 		type,
	// 		year,
	// 		image,
	// 		releaseDate,
	// 		runtimeMins,
	// 		runtimeStr,
	// 		plot,
	// 		awards,
	// 		directors,
	// 		directorList,
	// 		writers,
	// 		writerList,
	// 		stars,
	// 		starList,
	// 		actorList,
	// 		fullCast,
	// 		genres,
	// 		genreList,
	// 		companies,
	// 		companyList,
	// 		countries,
	// 		countryList,
	// 		languages,
	// 		languageList,
	// 		contentRating,
	// 		imDbRating,
	// 		imDbRatingVotes,
	// 		metacriticRating,
	// 		ratings,
	// 		wikipedia,
	// 		posters,
	// 		images,
	// 		trailer,
	// 		boxOffice,
	// 		tagline,
	// 		keywords,
	// 		keywordList,
	// 		similars,
	// 		tvSeriesInfo,
	// 		tvEpisodeInfo,
	// 		errorMessage,
	// 	});
	// }
};

module.exports = {
	getMovie,
	addMovie,
	searchMovies,
};
