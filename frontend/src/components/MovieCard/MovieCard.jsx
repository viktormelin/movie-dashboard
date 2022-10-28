import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getMovie } from '../../features/movies/movieSlice';
import './MovieCard.css';

const MovieCard = ({ movieCardClick, movie }) => {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();
	const poster =
		movie.image === '' ? 'https://via.placeholder.com/150' : movie.image;

	// const onClick = () => {
	// 	dispatch(getMovie(movie.id));
	// 	navigate(`/movies/${movie.id}`);
	// };
	return (
		<div
			className='moviecard'
			style={{ backgroundImage: `url(${poster})` }}
			onClick={() => movieCardClick(movie.id)}
		>
			<p className='moviecard__title'>{movie.title}</p>
			<p className='moviecard__rating'>
				{movie.imDbRating} | {movie.runtimeStr}
			</p>
		</div>
	);
};

export default MovieCard;
