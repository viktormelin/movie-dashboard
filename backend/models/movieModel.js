const mongoose = require('mongoose');

const list2 = {
	key: String,
	value: String,
};

const list = {
	id: String,
	name: String,
};

const actorlist = {
	id: String,
	image: String,
	name: String,
	asCharacter: String,
};

const boxoffice = {
	budget: String,
	openingWeekendUSA: String,
	grossUSA: String,
	cumulativeWorldWideGross: String,
};

const similar = {
	id: String,
	title: String,
	image: String,
	imDbRating: String,
};

const tvseriesinfo = {
	yearEnd: String,
	creators: String,
	creatorList: [list],
	seasons: [String],
};

const movieSchema = mongoose.Schema({
	id: String,
	title: String,
	originalTitle: String,
	fullTitle: String,
	type: String,
	year: String,
	image: String,
	releaseDate: String,
	runtimeMins: String,
	runtimeStr: String,
	plot: String,
	awards: String,
	directors: String,
	directorList: [list],
	writers: String,
	writerList: [list],
	stars: String,
	starList: [list],
	actorList: [actorlist],
	fullCast: String,
	genres: String,
	genreList: [list2],
	companies: String,
	companyList: [list],
	countries: String,
	countryList: [list2],
	languages: String,
	languageList: [list2],
	contentRating: String,
	imDbRating: String,
	imDbRatingVotes: String,
	metacriticRating: String,
	ratings: String,
	wikipedia: String,
	posters: String,
	images: String,
	trailer: String,
	boxOffice: boxoffice,
	tagline: String,
	keywords: String,
	keywordList: [String],
	similars: [similar],
	tvSeriesInfo: tvseriesinfo,
	tvEpisodeInfo: String,
	errorMessage: String,
});

module.exports = mongoose.model('Movies', movieSchema);
