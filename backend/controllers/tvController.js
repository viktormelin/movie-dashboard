const axios = require('axios');
const asyncHandler = require('express-async-handler');

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/4/',
	headers: {
		authorization: `Bearer ${process.env.API_TOKEN}`,
	},
});

const axiosInstanceOld = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		authorization: `Bearer ${process.env.API_TOKEN}`,
	},
});

const getSeries = asyncHandler(async (req, res) => {
	const { id } = req.params;
	console.log(id);
	if (id) {
		const response = await axiosInstanceOld.get(`tv/${id}`);

		if (response.status === 200) {
			res.status(200).send(response.data);
		} else {
			res.status(400);
			throw new Error(response.data.errorMessage);
		}
	} else {
		res.status(400);
		throw new Error('Invalid data');
	}
});

module.exports = {
	getSeries,
};
