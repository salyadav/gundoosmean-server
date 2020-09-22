const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const BASE_URL = "/";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

//DB setup
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection established successfully');
});

const leaderboardRouter = require(path.join(__dirname, './routes/leaderboard'));
const feedbackRouter = require(path.join(__dirname, './routes/feedback'));

app.use(BASE_URL + 'feedback', feedbackRouter);
app.use(BASE_URL + 'leaderboard', leaderboardRouter);

app.Router().get(BASE_URL, (req, res) => res.json({
    test: "Test api call successful"
}));

//server start
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});