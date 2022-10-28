import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { store } from '../app/store';
import { ToastContainer } from 'react-toastify';
import './App.css';
// import MoviePage from '../pages/Movies/MoviePage';
import Index from '../pages/Index';

export default function AppWrapper() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Index />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					{/* <Route path='/movies/:id' element={<MoviePage />} /> */}
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
};
