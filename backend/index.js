const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler);

app.use('/api/user', require('./routes/userRoute'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/tv', require('./routes/tvRoutes'));

app.listen(port, () => {
	console.log(`Backend running @ ${process.env.URL}:${port}`);
});
