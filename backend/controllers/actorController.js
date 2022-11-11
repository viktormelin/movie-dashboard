const axios = require('axios');
const asyncHandler = require('express-async-handler');

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		authorization: `Bearer ${process.env.API_TOKEN}`,
	},
});

const getActor = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (id) {
		const response = await axiosInstance.get(
			`person/${id}?append_to_response=combined_credits,images`
		);

		console.log(response.data);

		if (response.status === 200) {
			res.status(200).send(response.data);
		} else {
			res.status(400);
			throw new Error(response.data.status_message);
		}
	} else {
		res.status(400);
		throw new Error('Invalid data');
	}
});

module.exports = {
	getActor,
};
