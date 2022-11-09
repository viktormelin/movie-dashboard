import { Box, Container } from '@mui/material';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const Series = () => {
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

export default Series;
