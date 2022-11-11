import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { store } from '../app/store';
import { ToastContainer } from 'react-toastify';
import './App.css';
// import MoviePage from '../pages/Movies/MoviePage';
// import Index from '../pages/Index';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Movies from '../pages/Movies';
import Series from '../pages/Series';
import MoviePreview from '../pages/MoviePreview';
import ForgotPassword from '../pages/ForgotPassword';

export default function AppWrapper() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	);
}

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgotpassword' element={<ForgotPassword />} />
					<Route path='/movies' element={<Movies />} />
					<Route path='/:type/:id' element={<MoviePreview />} />
					{/* <Route path='/tv/:id' element={<MoviePreview />} /> */}
					<Route path='/series' element={<Series />} />
					{/* <Route path='/movies/:id' element={<MoviePage />} /> */}
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
};
