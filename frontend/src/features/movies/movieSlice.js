import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from './movieService';

const initialState = {
	movie: null,
	movies: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const addMovie = createAsyncThunk(
	'movies/add',
	async (movie, thunkAPI) => {
		try {
			return await movieService.addMovie(movie);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const searchMovies = createAsyncThunk(
	'movies/search',
	async (movie, thunkAPI) => {
		try {
			return await movieService.searchMovies(movie);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getMovie = createAsyncThunk('movies/get', async (id, thunkAPI) => {
	try {
		return await movieService.getMovie(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		resetMovie: (state) => {
			(state.isLoading = false),
				(state.isError = false),
				(state.isSuccess = false),
				(state.movie = null),
				(state.movies = null),
				(state.message = '');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchMovies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(searchMovies.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.movies = action.payload);
			})
			.addCase(searchMovies.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.movies = null),
					(state.message = action.payload);
			})
			.addCase(addMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addMovie.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.movie = action.payload);
			})
			.addCase(addMovie.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.movie = null),
					(state.message = action.payload);
			})
			.addCase(getMovie.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMovie.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.movie = action.payload);
			})
			.addCase(getMovie.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.movie = null),
					(state.message = action.payload);
			});
	},
});

export const { resetMovie } = movieSlice.actions;
export default movieSlice.reducer;
