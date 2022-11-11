import { useEffect, useState } from 'react';
import getMovieApi from '../api/getMovieApi';

export const useMovie = (type, id) => {
	const [movieData, setMovieData] = useState({
		loading: true,
		movieData: {
			details: null,
			credits: null,
			similar: null,
			videos: null,
		},
	});

	useEffect(() => {
		const fetchMovie = async () => {
			if (type === 'movie') {
				const response = await getMovieApi(id);
				setMovieData({
					loading: false,
					movieData: {
						details: response.details,
						credits: response.credits,
						similar: response.similar,
						videos: response.videos,
					},
				});
			} else if (type === 'tv') {
				console.log('fetch tv');
			}
		};

		fetchMovie();
	}, []);

	return movieData;
};
