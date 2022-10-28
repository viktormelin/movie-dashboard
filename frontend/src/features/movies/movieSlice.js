import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from './movieService';

const initialState = {
	movie: null,
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

export const getMovie = createAsyncThunk(
	'movies/get',
	async (movie, thunkAPI) => {
		try {
			return await movieService.getMovie(movie);
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

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		resetMovie: (state) => {
			(state.isLoading = false),
				(state.isError = false),
				(state.isSuccess = false),
				(state.message = '');
		},
	},
	extraReducers: (builder) => {
		builder
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
