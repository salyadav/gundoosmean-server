const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userScoreSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true, 
        minlength: 5
    }, 
    highscore: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
});

const Leaderboard = mongoose.model('Leaderboard', userScoreSchema);

module.exports = Leaderboard;