import { Star } from '@mui/icons-material';
import {
	Avatar,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	Rating,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import getMovieApi from '../api/getMovieApi';
import Navbar from '../components/Navbar/Navbar';
import { getMovie } from '../features/movies/movieSlice';
import { useMovie } from '../hooks/useMovie';

const MoviePreview = () => {
	const { type, id } = useParams();
	// const movieData = useSelector((state) => state.movies);
	const { loading, movieData } = useMovie(type, id);
	const [rating, setRating] = useState();
	// const [loading, setLoading] = useState(true);

	const userData = useSelector((state) => state.auth);

	console.log(movieData.credits);

	if (!userData.user) {
		return <Navigate to='/login' />;
	}

	// useEffect(() => {
	// 	if (!movieData.movie || id != movieData.movie.id) {
	// 		dispatch(getMovie(id));
	// 	}

	// 	if (movieData.isSuccess && movieData.movie) {
	// 		setLoading(false);
	// 	}
	// }, [
	// 	movieData.movies,
	// 	movieData.movie,
	// 	movieData.isSuccess,
	// 	movieData.isError,
	// 	movieData.message,
	// 	dispatch,
	// 	id,
	// ]);

	return (
		<>
			{loading ? (
				<Backdrop
					open={loading}
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				>
					<CircularProgress size='36px' />
				</Backdrop>
			) : null}

			{movieData && !loading ? (
				<div
					className='homeContainer'
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.details.poster_path})`,
					}}
				>
					<Container maxWidth='lg'>
						<Box
							display='flex'
							alignItems='flex-end'
							height='100vh'
							position='relative'
							zIndex='10'
						>
							<Navbar />
							<Box height='40vh' width='100%' display='flex' gap='5rem'>
								<Box
									width='10rem'
									display='flex'
									flexDirection='column'
									flex='1'
								>
									<Typography mb='1rem' variant='h1'>
										{movieData.details.title}
									</Typography>
									<Box display='flex' gap='1rem'>
										<Typography variant='body2'>
											{movieData.details.runtime}
										</Typography>
										{movieData.details.genres.map((genre) => (
											<Typography variant='body2'>{genre.name}</Typography>
										))}
										<Typography variant='body2'>
											{movieData.details.release_date}
										</Typography>
									</Box>
									<Box
										mt='2rem'
										width='15rem'
										display='flex'
										justifyContent='space-between'
									>
										<Box display='flex' flexDirection='column' gap='1rem'>
											<Typography
												display='flex'
												alignItems='center'
												color='primary.main'
												variant='body2'
											>
												<Star /> {movieData.details.vote_average}
											</Typography>
											<Typography
												display='flex'
												alignItems='center'
												color='secondary.main'
												variant='body2'
											>
												<Star /> 0.0
											</Typography>
										</Box>
										<Box display='flex' alignItems='center'>
											<Rating
												name='movie-rating'
												precision={0.5}
												value={rating}
												onChange={(event, newValue) => {
													setRating(newValue);
												}}
												sx={{
													color: 'secondary.main',
													'& .MuiRating-icon': { color: 'secondary.main' },
												}}
											/>
										</Box>
									</Box>
									<Button
										// onClick={onSubmit}
										variant='contained'
										sx={{ marginTop: '2rem', width: '15rem' }}
									>
										Add to watchlist
									</Button>
								</Box>
								<Box display='flex' flexDirection='column' flex='1'>
									<Typography mb='1rem' variant='h3'>
										Actors
									</Typography>
									<Box display='flex' gap='1rem' flexWrap='wrap'>
										{movieData.credits.cast.map((actor) => (
											<Box
												display='flex'
												alignItems='center'
												gap='0.5rem'
												key={actor.id}
											>
												<Avatar
													src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
													alt={actor.name}
												/>
												<Typography
													sx={{
														cursor: 'pointer',
														'&:hover': {
															color: 'primary.main',
														},
													}}
													variant='body2'
												>
													{actor.name}
												</Typography>
											</Box>
										))}
									</Box>
								</Box>
							</Box>
						</Box>
					</Container>
				</div>
			) : null}
		</>
	);
};

export default MoviePreview;
