import { useSelector, useDispatch } from 'react-redux';
// import {
// 	MdAlternateEmail,
// 	MdPassword,
// 	MdDriveFileRenameOutline,
// 	MdVpnKey,
// } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword, resetUser } from '../features/auth/authSlice';
import { useEffect, useState } from 'react';
// import Spinner from '../Spinner';
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

const ForgotPassword = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const [popup, setPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('Action failed..');

	const { email, password, passwordConfirm } = formData;

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
		if (email != '' || password != '' || passwordConfirm != '') {
			if (password == passwordConfirm) {
				const userData = {
					email,
					password,
				};

				dispatch(resetPassword(userData));
			} else {
				setPopupMessage('Passwords do not match');
				setPopup(true);
			}
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
							<Typography variant='h1'>Forgot password.</Typography>
							<Typography display='flex' flexDirection='row' variant='body1'>
								Already a member?{' '}
								<Typography
									ml='1rem'
									component='span'
									color='primary.main'
									variant='body1'
								>
									<Link to='/login'>Log In</Link>
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
								id='password'
								name='password'
								variant='filled'
								label='Password'
								type='password'
								required
								onChange={onChange}
							/>
							<TextField
								id='passwordConfirm'
								name='passwordConfirm'
								variant='filled'
								label='Confirm Password'
								type='password'
								required
								onChange={onChange}
							/>
							<Button
								onClick={onSubmit}
								variant='contained'
								sx={{ marginTop: '2rem' }}
							>
								Reset Password
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default ForgotPassword;
