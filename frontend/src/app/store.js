import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import movieReducer from '../features/movies/movieSlice';
import pageReducer from '../features/utils/pageSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		movies: movieReducer,
		page: pageReducer,
	},
});
