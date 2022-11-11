import {
	Clear,
	Group,
	Logout,
	Person,
	Search,
	Settings,
} from '@mui/icons-material';
import {
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	TextField,
	Tooltip,
	Typography,
	Box,
	InputAdornment,
	CircularProgress,
	Dialog,
	List,
	ListItem,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import searchApi from '../../api/searchApi';
import {
	addMovie,
	getMovie,
	resetMovie,
	searchMovies,
} from '../../features/movies/movieSlice';
import { setPage } from '../../features/utils/pageSlice';

const Navbar = () => {
	const [accountMenuState, accountMenuSetState] = useState(null);
	const menuOpen = Boolean(accountMenuState);
	const [searchQuery, setQuery] = useState(null);
	const [searchResult, setSearchResult] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchResultWindowOpen, setSearchResultWindowOpen] = useState(false);

	const { page } = useSelector((state) => state.page);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const movieData = useSelector((state) => state.movies);

	// useEffect(() => {
	// 	if (movieData.isError) {
	// 		console.error(movieData.message);
	// 	}

	// 	// if (movieData.isSuccess && movieData.movies) {
	// 	// 	setSearchResult(movieData.movies);
	// 	// 	setLoading(false);
	// 	// }
	// }, [
	// 	movieData.movies,
	// 	movieData.movie,
	// 	movieData.isSuccess,
	// 	movieData.isError,
	// 	movieData.message,
	// 	dispatch,
	// ]);

	const searchChange = (e) => {
		setQuery(e.target.value);
	};

	const searchSubmit = async (e) => {
		e.preventDefault();
		if (searchQuery && searchQuery != '') {
			setSearchResultWindowOpen(true);
			setQuery(null);
			setLoading(true);
			// dispatch(searchMovies(searchQuery));
			setSearchResult(await searchApi(searchQuery));
			setLoading(false);
		}
	};

	const clickMovie = (movie) => {
		dispatch(resetMovie());
		setSearchResult(null);
		setQuery(null);

		// dispatch(getMovie(movie));
		navigate(`/${movie.media_type}/${movie.id}`);
	};

	const emptySubmit = () => {
		setSearchResult(null);
		setQuery(null);
	};

	return (
		<Box
			position='fixed'
			left='0'
			top='0'
			display='flex'
			justifyContent='space-between'
			height='fit-content'
			width='100%'
			padding='1rem 5rem'
		>
			{searchResultWindowOpen ? (
				<Dialog
					open={searchResultWindowOpen}
					onClose={() => setSearchResultWindowOpen(false)}
					scroll='body'
				>
					<Box
						sx={{
							width: '100%',
							height: '50vh',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{searchResult && !loading ? (
							<Box
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem',
									paddingTop: '1rem',
									paddingBottom: '1rem',
								}}
							>
								{searchResult.map((item) => (
									<Box
										key={item.id}
										sx={{
											display: 'flex',
											alignItems: 'center',
											cursor: 'pointer',
											color: '#fff',
											'&:hover': {
												bgcolor: 'gray.dark',
											},
										}}
										onClick={() => clickMovie(item)}
									>
										<img
											style={{ maxHeight: '7rem', marginRight: '1rem' }}
											src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
											alt={item.title}
										/>
										<Box sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
											<Typography fontSize='1.1rem' variant='h3'>
												{item.title || item.name} -{' '}
												{item.release_date || item.first_air_date}
											</Typography>
											<Typography fontSize='0.8rem' variant='body1'>
												{item.overview}
											</Typography>
										</Box>
									</Box>
								))}
							</Box>
						) : null}
						{loading ? <CircularProgress size='36px' /> : null}
					</Box>
				</Dialog>
			) : null}
			<Box display='flex' alignItems='center' gap='1.5rem'>
				<Typography fontSize='1.2rem' variant='body1'>
					<Link onClick={() => dispatch(setPage('dashboard'))} to='/dashboard'>
						Home
					</Link>
				</Typography>
				<Typography fontSize='1.2rem' variant='body1'>
					<Link onClick={() => dispatch(setPage('movies'))} to='/movies'>
						Movies
					</Link>
				</Typography>
				<Typography fontSize='1.2rem' variant='body1'>
					<Link onClick={() => dispatch(setPage('series'))} to='/series'>
						Series
					</Link>
				</Typography>
			</Box>
			<Box display='flex' alignItems='center' gap='1rem'>
				<Box position='relative' display='flex' flexDirection='column'>
					<form onSubmit={searchSubmit}>
						<TextField
							id='searchQuery'
							name='searchQuery'
							variant='filled'
							label='Search'
							size='small'
							onChange={searchChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										{loading ? <CircularProgress size='24px' /> : null}
										{!loading && !searchResult ? (
											<Search
												onClick={searchSubmit}
												sx={{
													cursor: 'pointer',
													color: 'primary.main',
												}}
											/>
										) : null}
										{!loading && searchResult ? (
											<Clear
												onClick={emptySubmit}
												sx={{
													cursor: 'pointer',
													color: 'primary.main',
												}}
											/>
										) : null}
									</InputAdornment>
								),
							}}
						/>
					</form>
				</Box>
				<Tooltip title='Friends' arrow>
					<IconButton
						// onClick={accountMenu}
						size='small'
					>
						<Link to='/friends'>
							<Group sx={{ color: '#fff' }} fontSize='large' />
						</Link>
					</IconButton>
				</Tooltip>
				<Tooltip title='Account' arrow>
					<IconButton
						onClick={(event) => accountMenuSetState(event.currentTarget)}
						size='small'
						aria-controls={menuOpen ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={menuOpen ? 'true' : undefined}
					>
						<Person sx={{ color: '#fff' }} fontSize='large' />
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={accountMenuState}
				id='account-menu'
				open={menuOpen}
				onClose={() => accountMenuSetState(null)}
				onClick={() => accountMenuSetState(null)}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem>
					<ListItemIcon>
						<Settings color='secondary' fontSize='small' />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Logout color='secondary' fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default Navbar;
