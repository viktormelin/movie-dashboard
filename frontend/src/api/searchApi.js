import axios from 'axios';
import { getToken } from '../features/auth/authService';

const API_URL = 'http://localhost:5000/api/';

const searchApi = async (id) => {
	const config = {
		headers: {
			authorization: `Bearer ${await getToken()}`,
		},
	};

	const response = await axios.get(API_URL + `movies/search/${id}`, config);
	return response.data;
};

export default searchApi;
