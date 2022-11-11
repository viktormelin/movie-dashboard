import {
	Avatar,
	Backdrop,
	Box,
	CircularProgress,
	Container,
	Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { useActor } from '../hooks/useActor';

const ActorPreview = () => {
	const { id } = useParams();
	const { loading, actorData } = useActor(id);

	const userData = useSelector((state) => state.auth);
	const navigate = useNavigate();

	if (!userData.user) {
		navigate('/login');
	}

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

			{actorData && !loading ? (
				<div
					className='homeContainer'
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original${actorData.profile_path})`,
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
										{actorData.name}
									</Typography>
									<Box display='flex' gap='1rem'>
										<Typography variant='body2'>
											{actorData.birthday}
										</Typography>
									</Box>
									<Box mt='2rem' display='flex' justifyContent='space-between'>
										<Typography variant='body1'>
											{actorData.biography}
										</Typography>
									</Box>
								</Box>
								<Box display='flex' flexDirection='column' flex='1'>
									<Typography mb='1rem' variant='h3'>
										Movies
									</Typography>
									<Box display='flex' gap='1rem' flexWrap='wrap'>
										{actorData.combined_credits.cast.map((movie) => (
											<Box
												display='flex'
												alignItems='center'
												gap='0.5rem'
												key={movie.id}
											>
												<Avatar
													src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
													alt={movie.title}
												/>
												<Typography
													sx={{
														cursor: 'pointer',
														'&:hover': {
															color: 'primary.main',
														},
													}}
													onClick={() => clickActor(movie.media_type, movie.id)}
													variant='body2'
												>
													{movie.title}
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

export default ActorPreview;
