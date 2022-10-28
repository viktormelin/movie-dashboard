import React, { useEffect, useState } from 'react';
import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, resetUser } from '../features/auth/authSlice';
import Header from '../components/Header/Header';

import '../components/Login/Login.css';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
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
		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	return (
		<div className='container'>
			<Header />
			<main className='login'>
				<div className='login__box'>
					<form className='login__form'>
						<label htmlFor='email'>Email</label>
						<div className='login__form_input'>
							<input type='text' name='email' onChange={onChange} />
							<MdAlternateEmail />
						</div>
						<label htmlFor='password'>Password</label>
						<div className='login__form_input'>
							<input type='password' name='password' onChange={onChange} />
							<MdPassword />
						</div>
						<div className='login__form_button'>
							<p onClick={onSubmit}>Login</p>
						</div>
					</form>
					<div className='login__footer'>
						<Link to='/register'>Not a member yet? Register now</Link>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;
