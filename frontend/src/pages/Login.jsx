import React, { useEffect, useState } from 'react';
// import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, resetUser } from '../features/auth/authSlice';
// import Header from '../Header/Header';

import {
	Container,
	Box,
	Typography,
	TextField,
	Button,
	Snackbar,
	Alert,
} from '@mui/material';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const [popup, setPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('Action failed..');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			setPopupMessage(message);
			setPopup(true);
		}

		if (isSuccess || user) {
			navigate('/dashboard');
		}

		dispatch(resetUser());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (email != '' || password != '') {
			const userData = {
				email,
				password,
			};

			dispatch(login(userData));
		} else {
			setPopupMessage('Missing required inputs');
			setPopup(true);
		}
	};

	return (
		<div className='registerContainer'>
			<Snackbar
				open={popup}
				autoHideDuration={6000}
				onClose={() => setPopup(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={() => setPopup(false)} severity='info'>
					{popupMessage}
				</Alert>
			</Snackbar>
			<Container maxWidth='lg'>
				<Box
					display='flex'
					height='100vh'
					alignItems='center'
					position='relative'
					zIndex='10'
				>
					<Box width='22rem'>
						<Box>
							<Typography variant='h1'>Login.</Typography>
							<Typography display='flex' flexDirection='row' variant='body1'>
								New member?{' '}
								<Typography
									ml='0.25rem'
									component='span'
									color='primary.main'
									variant='body1'
								>
									<Link to='/register'>Create account</Link>
								</Typography>
							</Typography>
						</Box>
						<Box display='flex' flexDirection='column' gap='1rem' mt='5rem'>
							<TextField
								id='email'
								name='email'
								variant='filled'
								label='Email'
								required
								onChange={onChange}
							/>
							<TextField
								color='secondary'
								id='password'
								variant='filled'
								label='Password'
								type='password'
								required
								onChange={onChange}
							/>
							<Button
								onClick={onSubmit}
								variant='contained'
								sx={{ marginTop: '2rem' }}
							>
								Login
							</Button>
							<Typography component='span' color='primary.main' variant='body1'>
								<Link to='/forgotpassword'>Forgot password?</Link>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default Login;
