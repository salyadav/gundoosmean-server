const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userFeedbackSchema = new Schema({
    username: {
        type: String, 
        required: true,
        trim: true
    }, 
    feedback: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: false, 
        default: null,
        trim: true
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', userFeedbackSchema);

module.exports = Feedback;