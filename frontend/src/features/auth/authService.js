import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user/';

export const getToken = async () => {
	const res = localStorage.getItem('user');
	const user = JSON.parse(res);
	return user.token;
};

const resetPassword = async (userData) => {
	const response = await axios.post(API_URL + '/resetpassword', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

const register = async (userData) => {
	const response = await axios.post(API_URL, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

const login = async (userData) => {
	const response = await axios.post(API_URL + 'login', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

const authService = {
	resetPassword,
	register,
	login,
};

export default authService;
