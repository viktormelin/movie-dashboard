import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { MdSearch, MdHome, MdVideoLibrary, MdGroup } from 'react-icons/md';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

import '../components/Dashboard/Dashboard.css';
import '../components/MoviePage/MoviePage.css';
import { useState } from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import { addMovie, getMovie } from '../features/movies/movieSlice';

const Dashboard = () => {
	const [currentDisplay, setDisplay] = useState('movie');
	const [searchQuery, setSearchQuery] = useState('');
	const [awaiting, setAwaiting] = useState(false);
	const [movies, setMovies] = useState([]);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const movieData = useSelector((state) => state.movies);
	const userData = useSelector((state) => state.auth);

	// const { user, isLoading, isError, isSuccess, message } = useSelector(
	// 	(state) => state.auth
	// );

	if (!userData.user) {
		return <Navigate to='/login' />;
	}

	const onSubmit = async (e) => {
		e.preventDefault();

		setAwaiting(true);

		const response = await axios.get(
			'https://imdb-api.com/en/API/AdvancedSearch/k_r2r5eq76/?title=' +
				searchQuery
		);

		// for (const movie of response.data.results) {
		// 	console.log(movie);
		// 	dispatch(addMovie(movie));
		// }

		setAwaiting(false);

		if (
			response.data.errorMessage === '' ||
			response.data.errorMessage === null
		) {
			setMovies(response.data.results);
		} else {
			console.error(response.data.errorMessage);
		}
	};

	const movieCardClick = (id) => {
		dispatch(getMovie(id));
		setDisplay('movie');
	};

	return (
		<div className='dashboard'>
			<aside className='dashboard__sidebar'>
				<div className='dashboard__sidebar_user'>
					<img src='https://i.pravatar.cc/100' alt='Avatar' />
				</div>
				<div className='dashboard__sidebar_nav'>
					<div
						className='dashboard__sidebar_nav_item'
						onClick={() => setDisplay('search')}
					>
						<MdSearch size={'2rem'} />
					</div>
					<div
						className='dashboard__sidebar_nav_item'
						onClick={() => setDisplay('home')}
					>
						<MdHome size={'2rem'} />
					</div>
					<div
						className='dashboard__sidebar_nav_item'
						onClick={() => setDisplay('library')}
					>
						<MdVideoLibrary size={'2rem'} />
					</div>
					<div
						className='dashboard__sidebar_nav_item'
						onClick={() => setDisplay('friends')}
					>
						<MdGroup size={'2rem'} />
					</div>
				</div>
			</aside>
			<main className='dashboard__main'>
				{currentDisplay === 'home' && <p>Home Display</p>}
				{currentDisplay === 'search' && (
					<div className='dashboard__main_search'>
						<form onSubmit={onSubmit} className='dashboard__main_search_form'>
							<label htmlFor='email'>Search for title</label>
							<div className='dashboard__main_search_form_input'>
								<input
									type='text'
									name='search'
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<button className='dashboard__main_search_form_button'>
									<MdSearch size={'1.5rem'} />
								</button>
							</div>
						</form>
						<div className='dashboard__main_search_result'>
							{awaiting && (
								<div className='dashboard__main_search_result_awaiting'>
									<ClipLoader
										color={'#ffffff'}
										loading={awaiting}
										size={100}
										aria-label='Loading Spinner'
										data-testid='loader'
									/>
								</div>
							)}
							{movies.map((movie) => (
								<MovieCard
									movieCardClick={movieCardClick}
									key={movie.id}
									movie={movie}
								/>
							))}
						</div>
					</div>
				)}

				{currentDisplay === 'movie' && (
					<div>
						{movieData.isLoading ? (
							<ClipLoader
								color={'#ffffff'}
								loading={movieData.isLoading}
								size={100}
								aria-label='Loading Spinner'
								data-testid='loader'
							/>
						) : null}

						{movieData.isSuccess ? (
							<div className='moviepage'>
								<div className='moviepage__content'>
									<div className='moviepage__content_side'>
										<header className='moviepage__content_header'>
											<h2>
												{movieData.movie.title} ({movieData.movie.contentRating}
												)
											</h2>
											<div className='moviepage__content_header_rating'>
												<p>{movieData.movie.imDbRating}</p>
												<p>{movieData.movie.runtimeStr}</p>
											</div>
											<div className='moviepage__content_header_genres'>
												{movieData.movie.genreList.map((genre) => (
													<p>{genre.value}</p>
												))}
											</div>
										</header>
										<div className='moviepage__content_information'>
											<p>{movieData.movie.plot}</p>
										</div>
									</div>
									<aside className='moviepage__content_image'>
										<img src={movieData.movie.image} alt='' />
									</aside>
								</div>
								<div className='moviepage__details'>
									<div className='moviepage__details_actors'>
										{movieData.movie.actorList.map((actor) => (
											<div className='moviepage__details_actors_actor'>
												<img src={actor.image} alt='' />
												<div className='moviepage__details_actors_actor_text'>
													<p>{actor.name}</p>
													<p>{actor.asCharacter}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						) : null}
					</div>
				)}
				{currentDisplay === 'library' && <p>Library Display</p>}
				{currentDisplay === 'friends' && <p>Friends Display</p>}
			</main>
		</div>
	);
};

export default Dashboard;
