import axios from 'axios';
import { getToken } from '../features/auth/authService';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api/',
	headers: {
		authorization: `Bearer ${await getToken()}`,
	},
});

const getActorApi = async (id) => {
	const response = await axiosInstance.get(`actors/${id}`);
	return response.data;
};

export default getActorApi;
