import { useSelector, useDispatch } from 'react-redux';
import {
	MdAlternateEmail,
	MdPassword,
	MdDriveFileRenameOutline,
	MdVpnKey,
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { register, resetUser } from '../features/auth/authSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Header from '../components/Header/Header';

import 'react-toastify/dist/ReactToastify.css';
import '../components/Register/Register.css';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		token: '',
	});

	const { name, email, password, token } = formData;

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
			name,
			email,
			password,
			token,
		};

		dispatch(register(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className='container'>
			<Header />
			<main className='register'>
				<div className='register__box'>
					<form className='register__form'>
						<label htmlFor='name'>Name</label>
						<div className='register__form_input'>
							<input required type='text' name='name' onChange={onChange} />
							<MdDriveFileRenameOutline />
						</div>
						<label htmlFor='email'>Email</label>
						<div className='register__form_input'>
							<input required type='text' name='email' onChange={onChange} />
							<MdAlternateEmail />
						</div>
						<label htmlFor='password'>Password</label>
						<div className='register__form_input'>
							<input
								required
								type='password'
								name='password'
								onChange={onChange}
							/>
							<MdPassword />
						</div>
						<label htmlFor='token'>Token</label>
						<div className='register__form_input'>
							<input required type='text' name='token' onChange={onChange} />
							<MdVpnKey />
						</div>
						<div className='register__form_button'>
							<p onClick={onSubmit}>Register</p>
						</div>
					</form>
					<div className='register__footer'>
						<Link to='/login'>Already a member? Login instead</Link>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Register;
