const mongoose = require('mongoose');

const connectDB = async () => {
	if (!process.env.MONGO_URI) {
		throw new Error('Please add the mongo db connection url');
	}

	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			dbName: 'moviedb',
		});
		console.log('mongodb connected');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
