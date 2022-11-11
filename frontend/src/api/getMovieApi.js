import axios from 'axios';
import { getToken } from '../features/auth/authService';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api/',
	headers: {
		authorization: `Bearer ${await getToken()}`,
	},
});

const getMovieApi = async (id) => {
	const response = await axiosInstance.get(`movies/${id}`);
	return response.data;
};

export default getMovieApi;
