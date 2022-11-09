import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
	Container,
	Box,
	Typography,
	TextField,
	Button,
	Snackbar,
	Alert,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	Tooltip,
} from '@mui/material';

import { Person, Group, Logout, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { addMovie, getMovie } from '../features/movies/movieSlice';
import Notify from '../components/Notify/Notify';
import Navbar from '../components/Navbar/Navbar';

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const movieData = useSelector((state) => state.movies);
	const userData = useSelector((state) => state.auth);
	const { page } = useSelector((state) => state.page);

	if (!userData.user) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='homeContainer'>
			<Container maxWidth='lg'>
				<Box display='flex' height='100vh' position='relative' zIndex='10'>
					<Navbar />
				</Box>
			</Container>
		</div>
	);
};

export default Dashboard;
