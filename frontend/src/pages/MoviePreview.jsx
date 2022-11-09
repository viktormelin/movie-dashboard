import { Star } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	Rating,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { getMovie } from '../features/movies/movieSlice';

const MoviePreview = () => {
	const { id } = useParams();
	const movieData = useSelector((state) => state.movies);
	const [rating, setRating] = useState();
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!movieData.movie || id != movieData.movie.id) {
			dispatch(getMovie(id));
		}

		if (movieData.isSuccess && movieData.movie) {
			setLoading(false);
		}
	}, [
		movieData.movies,
		movieData.movie,
		movieData.isSuccess,
		movieData.isError,
		movieData.message,
		dispatch,
		id,
	]);

	return (
		<div
			className='homeContainer'
			style={
				movieData.movie && { backgroundImage: `url(${movieData.movie.image})` }
			}
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
					{loading ? <CircularProgress size='24px' /> : null}
					{movieData.movie ? (
						<Box height='40vh' width='100%' display='flex' gap='5rem'>
							<Box width='10rem' display='flex' flexDirection='column' flex='1'>
								<Typography mb='1rem' variant='h1'>
									{movieData.movie.title}
								</Typography>
								<Box display='flex' gap='1rem'>
									<Typography variant='body2'>
										{movieData.movie.runtimeStr}
									</Typography>
									<Typography variant='body2'>
										{movieData.movie.genres}
									</Typography>
									<Typography variant='body2'>
										{movieData.movie.year}
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
											<Star /> {movieData.movie.imDbRating}
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
									{movieData.movie.actorList.map((actor) => (
										<Box
											display='flex'
											alignItems='center'
											gap='0.5rem'
											key={actor.id}
										>
											<Avatar src={actor.image} alt={actor.name} />
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
					) : null}
				</Box>
			</Container>
		</div>
	);
};

export default MoviePreview;
