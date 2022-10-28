import { Link } from 'react-router-dom';
import { MdFiberNew, MdLogin } from 'react-icons/md';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	return (
		<div className='header'>
			<div className='header__logo'>
				<Link to='/'>The Movie Dashboard</Link>
			</div>
			<div className='header__navbar'>
				<Link to='/login'>
					<MdLogin size={'1.25rem'} /> Login
				</Link>
				<Link to='/register'>
					<MdFiberNew size={'1.25rem'} /> Register
				</Link>
			</div>
		</div>
	);
};

export default Header;
