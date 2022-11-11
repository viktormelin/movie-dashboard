import axios from 'axios';
import { getToken } from '../auth/authService';

const API_URL = 'http://localhost:5000/api/';

const addMovie = async (movieData) => {
	const config = {
		headers: {
			authorization: `Bearer ${await getToken()}`,
		},
	};

	const response = await axios.post(API_URL + 'movies', movieData, config);
	return response.data;
};

const searchMovies = async (id) => {
	const config = {
		headers: {
			authorization: `Bearer ${await getToken()}`,
		},
	};

	const response = await axios.get(API_URL + `movies/search/${id}`, config);

	if (response.data) {
		return response.data;
	}
};

const getMovie = async (movie) => {
	const config = {
		headers: {
			authorization: `Bearer ${await getToken()}`,
		},
	};

	console.log(movie);

	const response = await axios.get(
		API_URL + `${movie.media_type}/${movie.id}`,
		config
	);

	console.log(response);

	// if (response.data) {
	// 	return response.data;
	// } else {
	// 	const movie = await axios.get(
	// 		'https://imdb-api.com/en/API/Title/k_r2r5eq76/' + movieData
	// 	);

	// 	console.log(movie);

	// 	const response = await axios.post(API_URL, movie, config);
	// 	return response.data;
	// }
};

const movieService = {
	addMovie,
	getMovie,
	searchMovies,
};

export default movieService;
