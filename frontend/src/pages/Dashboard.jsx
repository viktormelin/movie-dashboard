import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Navbar from '../components/Navbar/Navbar';

const Dashboard = () => {
	const userData = useSelector((state) => state.auth);

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
